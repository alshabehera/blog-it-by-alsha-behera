require 'test_helper'

class PostTest < ActiveSupport::TestCase
  def setup
    @user = create(:user)
    @organization = create(:organization)
    @post = create(:post, user: @user, organization: @organization)
  end

  def test_post_should_not_be_valid_without_title
    @post.title = ''
    assert_not @post.valid?
  end

  def test_post_slug_is_parameterized_title
    title = @post.title
    assert_equal title.parameterize, @post.slug
  end

  def test_is_bloggable_should_be_inclusion_boolean
    @post.is_bloggable = nil
    assert_not @post.valid?
    assert_includes @post.errors[:is_bloggable], 'is not included in the list'
  end

  def test_incremental_slug_generation_for_posts_with_duplicate_two_worded_titles
    first_post = Post.create!(title: 'test post', description: 'Sample description 1', user: @user,
                              organization: @organization)
    second_post = Post.create!(title: 'test post', user: @user, description: 'Sample description 2',
                               organization: @organization)
    assert_equal 'test-post', first_post.slug
    assert_equal 'test-post-2', second_post.slug
  end

  def test_incremental_slug_generation_for_posts_with_duplicate_hyphenated_titles
    first_post = Post.create!(title: 'test-post', description: 'Sample description 1', user: @user,
                              organization: @organization)
    second_post = Post.create!(title: 'test-post', user: @user, description: 'Sample description 2',
                               organization: @organization)
    assert_equal 'test-post', first_post.slug
    assert_equal 'test-post-2', second_post.slug
  end

  def test_slug_generation_for_posts_having_titles_one_being_prefix_of_the_other
    first_post = Post.create!(title: 'program', description: 'Sample description 1', user: @user,
                              organization: @organization)
    second_post = Post.create!(title: 'programming', user: @user, description: 'Sample description 2',
                               organization: @organization)
    assert_equal 'program', first_post.slug
    assert_equal 'programming', second_post.slug
  end

  def test_error_raised_for_duplicate_slug
    another_test_post = Post.create!(title: 'test-post', description: 'Sample description 1', user: @user,
                                     organization: @organization)
    assert_raises ActiveRecord::RecordInvalid do
      another_test_post.update!(slug: @post.slug)
    end

    error_msg = another_test_post.errors.full_messages.to_sentence
    assert_match I18n.t('post.slug.immutable'), error_msg
  end

  def test_updating_title_does_not_update_slug
    assert_no_changes -> { @post.reload.slug } do
      updated_post_title = 'updated post title'
      @post.update!(title: updated_post_title)
      assert_equal updated_post_title, @post.title
    end
  end

  def test_slug_suffix_is_maximum_slug_count_plus_one_if_two_or_more_slugs_already_exist
    title = 'test-post'
    description = 'post description'

    first_post = Post.create!(title:, description: description, user: @user,
                              organization: @organization)
    second_post = Post.create!(title:, description: description, user: @user,
                               organization: @organization)
    third_post = Post.create!(title:, description: description, user: @user,
                              organization: @organization)
    fourth_post = Post.create!(title:, description: description, user: @user,
                               organization: @organization)

    assert_equal "#{title.parameterize}-4", fourth_post.slug

    third_post.destroy

    expected_slug_suffix_for_new_post = fourth_post.slug.split('-').last.to_i + 1

    new_post = Post.create!(title:, description: description, user: @user, organization: @organization)
    assert_equal "#{title.parameterize}-#{expected_slug_suffix_for_new_post}", new_post.slug
  end

  def test_existing_slug_prefixed_in_new_post_title_doesnt_break_slug_generation
    title_having_new_title_as_substring = 'buy milk and apple'
    new_title = 'buy milk'
    description = 'post description'

    existing_post = Post.create!(title: title_having_new_title_as_substring, description: description, user: @user,
                                 organization: @organization)
    assert_equal title_having_new_title_as_substring.parameterize, existing_post.slug

    new_post = Post.create!(title: new_title, description: description, user: @user, organization: @organization)
    assert_equal new_title.parameterize, new_post.slug
  end

  def test_having_same_ending_substring_in_title_doesnt_break_slug_generation
    title_having_new_title_as_ending_substring = 'Go for grocery shopping and buy apples'
    new_title = 'buy apples'
    description = 'post description'

    existing_post = Post.create!(title: title_having_new_title_as_ending_substring, description: description, user: @user,
                                 organization: @organization)

    assert_equal title_having_new_title_as_ending_substring.parameterize, existing_post.slug

    new_post = Post.create!(title: new_title, description: description, user: @user,
                            organization: @organization)
    assert_equal new_title.parameterize, new_post.slug
  end

  def test_having_numbered_slug_substring_in_title_does_not_affect_slug_generation
    title_with_numbered_substring = 'buy 2 apples'
    description = 'Post description'

    existing_post = Post.create!(title: title_with_numbered_substring, description: description, user: @user,
                                 organization: @organization)
    assert_equal title_with_numbered_substring.parameterize, existing_post.slug

    substring_of_existing_slug = 'buy'
    new_post = Post.create!(title: substring_of_existing_slug, description: description, user: @user,
                            organization: @organization)

    assert_equal substring_of_existing_slug.parameterize, new_post.slug
  end

  def test_creates_multiple_posts_with_unique_slug
    posts = create_list(:post, 10)
    slugs = posts.pluck(:slug)
    assert_equal slugs.uniq, slugs
  end

  def test_post_should_have_many_categories
    categories = create_list(:category, 2)
    post = create(:post, categories: categories)

    assert_equal 2, post.categories.size
    categories.each do |category|
      assert_includes post.categories, category
    end
  end

  def test_status_should_have_valid_status_values
    assert_equal %w[Publish Draft], Post.statuses.keys
  end

  def test_last_published_date_is_set_when_status_is_publish
    @post.status = 'Publish'
    @post.save!
    assert_not_nil @post.last_published_date
  end

  def test_last_published_date_should_not_change_when_status_is_draft
    @post.status = 'Publish'
    @post.save!
    published_date = @post.last_published_date
    @post.status = 'Draft'
    @post.save!
    assert_equal published_date, @post.reload.last_published_date
  end

  def test_post_should_belong_to_user
    post = build(:post, user: nil)
    assert_not post.valid?
  end

  def test_post_should_belong_to_organization
    post = build(:post, organization: nil)
    assert_not post.valid?
  end
end
