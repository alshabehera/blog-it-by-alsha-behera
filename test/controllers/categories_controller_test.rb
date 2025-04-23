require 'test_helper'

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @category = create(:category, name: 'Technology')
    @user = create(:user)
    @auth_headers = headers(@user)
  end

  def test_should_get_all_categories
    get categories_path, headers: @auth_headers
    assert_response :success

    response_json = response.parsed_body
    assert_includes response_json, 'categories'
    assert_equal 1, response_json['categories'].count
    assert_equal 'Technology', response_json['categories'][0]['name']
  end

  def test_should_create_category
    post categories_path, params: { category: { name: 'Health' } }, headers: @auth_headers
    assert_response :created

    response_json = response.parsed_body
    assert_equal 'Health', response_json['name']
  end


  def test_shouldnt_create_category_without_name
    post categories_path, params: { category: { name: '' } }, headers: @auth_headers
    assert_response :unprocessable_entity
    response_json = response.parsed_body
    assert_includes response_json['error'], "Name can't be blank"
  end
end
