require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  def setup
    @category = build(:category)
  end

  def test_category_is_valid_with_proper_name
    assert @category.valid?
  end

  def test_category_is_invalid_without_name
    @category.name = ""
    assert_not @category.valid?
  end

  def test_category_should_have_and_belong_to_many_posts
    @category.save!
    organization = create(:organization)
    user = create(:user, organization: organization)

    post1 = create(:post, user: user, organization: organization)
    post2 = create(:post, user: user, organization: organization)

    @category.posts << post1
    @category.posts << post2

    assert_equal 2, @category.posts.count
    assert_includes @category.posts, post1
    assert_includes @category.posts, post2

    post1.reload
    post2.reload
    assert_includes post1.categories, @category
    assert_includes post2.categories, @category
  end
end
