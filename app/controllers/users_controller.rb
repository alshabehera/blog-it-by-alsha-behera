class UsersController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :create
  def create
    user = User.new(user_params)
    user.save!
    render_notice("User was successfully created!")
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end