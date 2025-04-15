require 'test_helper'

class OrganizationTest < ActiveSupport::TestCase
  def setup
    @organization = create(:organization)
  end

  def test_user_should_not_be_valid_and_saved_without_name
    @organization.name = ''
    assert_not @organization.valid?
    assert_includes @organization.errors.full_messages, "Name can't be blank"
  end

  def test_organization_can_have_multiple_users
    @organization.save!
    create_list(:user, 2, organization: @organization)
    assert_equal 2, @organization.users.count
  end

  def test_organization_should_have_multiple_posts
    @organization.save!
    create_list(:post, 3, organization: @organization)
    assert_equal 3, @organization.posts.count
  end

  def test_users_destroyed_with_organization
    @organization.save!
    create(:user, organization: @organization)
    assert_difference('User.count', -1) do
      @organization.destroy
    end
  end

  def test_posts_destroyed_with_organization
    @organization.save!
    create(:post, organization: @organization)
    assert_difference('Post.count', -1) do
      @organization.destroy
    end
  end
end
