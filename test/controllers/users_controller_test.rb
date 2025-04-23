require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  def setup
    @organization = create(:organization)
    @user = create(:user, organization: @organization)
    @auth_header = headers(@user)
  end

  def test_should_create_user_with_valid_params
    post users_url, params: {
      user: {
        name: 'Sam Smith',
        email: 'sam@example.com',
        password: 'welcome',
        password_confirmation: 'welcome',
        organization_id: @organization.id } 
    }, headers: @auth_header

    assert_response :success
    assert_includes response.parsed_body["notice"], "User was successfully created"
  end

  def test_should_not_create_user_with_invalid_params
    post users_url, params: {
      user: {
        name: "",                             
        email: "emai-example",              
        password: "word",                     
        password_confirmation: "incorrect",     
        organization_id: nil                   
      }
    }, headers: @auth_header

  
    assert_response :unprocessable_entity
  
    assert_includes response.parsed_body["error"], "Name can't be blank"
    assert_includes response.parsed_body["error"], "Email is invalid"
    assert_includes response.parsed_body["error"], "Organization must exist"
    assert_includes response.parsed_body["error"], "Password confirmation doesn't match Password"

  end

  def test_should_signup_user_with_valid_credentials
    post users_path, params: { user: { 
                                      name: 'Sam Smith',
                                      email: 'sam@example.com',
                                      password: 'welcome',
                                      password_confirmation: 'welcome',
                                      organization_id: @organization.id } 
                              }, headers: @auth_header
    assert_response :success
    response_json = response.parsed_body
  end

  def test_shouldnt_signup_user_with_invalid_credentials
    post users_path, params: { user: { 
                                      name: 'Sam Smith',
                                      email: 'sam@example.com',
                                      password: 'welcome',
                                      password_confirmation: 'not matching confirmation',
                                      organization_id: @organization.id } 
                              }, headers: @auth_header


    assert_response :unprocessable_entity
    assert_equal "Password confirmation doesn't match Password", response.parsed_body['error']
  end
end
