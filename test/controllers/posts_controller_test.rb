require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @category1 = create(:category)
    @category2 = create(:category)

    @post = create(
      :post,
      user: @user,
      organization: @organization,
      categories: [@category1],
      title: "Test Post",
      description: "This is a test post"
    )

    @auth_headers = headers(@user)
  end

  def test_should_list_all_posts
    get posts_path, headers: @auth_headers, as: :json
    assert_response :success

    body = response.parsed_body
    assert_kind_of Array, body["posts"]
    assert_equal Post.count, body["posts"].size
  end

  def test_should_create_valid_post
    post_params = {
      post: {
        title: "New Post",
        description: "Post description",
        status: "Publish",
        user_id: @user.id,
        organization_id: @organization.id,
        category_ids: [@category1.id, @category2.id]
      }
    }

    assert_difference -> { Post.count }, 1 do
      post posts_path, params: post_params, headers: @auth_headers, as: :json
    end

    assert_response :success
    assert_equal I18n.t("post.create"), response.parsed_body["notice"]
  end

  def test_post_should_not_create_with_invalid_params
    post_params = { title: "", description: "" }
  
    assert_no_difference "Post.count" do
      post posts_path, params: { post: post_params }, headers: @auth_headers, as: :json
    end
  
    assert_response :unprocessable_entity

    assert_equal "User must exist, Organization must exist, Title can't be blank, Description can't be blank",
                 response.parsed_body["error"]
  end               

  def test_should_show_post
    get post_path(@post.slug), headers: @auth_headers, as: :json
    assert_response :success
  
    response_json = response.parsed_body["post"]
    assert_equal @post.title, response_json["title"]
    assert_equal @post.description, response_json["description"]
    assert_equal @post.slug, response_json["slug"]
  end
  

  def test_should_update_post_with_valid_params
    update_params = {
      post: {
        title: "Updated Post Title",
        description: "Updated Description",
        category_ids: [@category1.id]
      }
    }

    patch post_path(@post.slug), params: update_params, headers: @auth_headers, as: :json
    assert_response :success

    @post.reload
    assert_equal "Updated Post Title", @post.title
    assert_equal "Updated Description", @post.description
    assert_equal I18n.t("post.update"), response.parsed_body["notice"]
  end

  def test_should_not_update_post_with_invalid_params
    patch post_path(@post.slug), params: { post: { title: "" } }, headers: @auth_headers, as: :json
  
    assert_response :unprocessable_entity
    assert_match "Title can't be blank", response.parsed_body["error"]
  end  


  def test_should_destroy_post
    assert_difference -> { Post.count }, -1 do
      delete post_path(@post.slug), headers: @auth_headers, as: :json
    end

    assert_response :success
    assert_equal I18n.t("post.delete"), response.parsed_body["notice"]
  end

  def test_should_filter_posts_by_category
    @post.categories << [@category1, @category2]

    get posts_path,
      params: { organization_id: @organization.id, category_ids: [@category1.id] },
      headers: @auth_headers, as: :json

    assert_response :success
    assert_equal 1, response.parsed_body.size
  end

  def test_should_update_post_status_to_publish_and_set_last_published_date
    patch post_path(@post.slug),
      params: {
        post: {
          title: "post-title",
          description: "post description",
          status: "Publish"
        }
      },
      headers: @user_headers, as: :json

    assert_response :success
    @post.reload
    assert_equal "Publish", @post.status 
    assert_not_nil @post.last_published_date
    assert_in_delta Time.current, @post.last_published_date, 1.second
  end

  def test_should_not_change_last_published_date_when_status_changes_to_draft
    original_last_published_date = @post.last_published_date

    patch post_path(@post.slug),
      params: {
        post: {
          title: "post-title-draft",
          description: "draft post description",
          status: "Draft"
        }
      },
      headers: @user_headers, as: :json

    assert_response :success
    @post.reload

    assert_equal "Draft", @post.status
    assert_equal original_last_published_date, @post.last_published_date
  end
end
