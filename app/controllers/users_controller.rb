class UsersController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token, only: :create
  def create
    user = User.create!(user_params)
    render_notice(t("user.create"))
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :organization_id)
  end
end