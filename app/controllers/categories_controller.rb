class CategoriesController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token
  def index
    @categories = Category.all
  end

  def create
    category = Category.create!(category_param)
  end

  private

  def category_param
    params.require(:category).permit(:name)
  end
end
