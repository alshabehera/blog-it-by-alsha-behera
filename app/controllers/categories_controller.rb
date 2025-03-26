class CategoriesController < ApplicationController
  def index
    @categories = Category.all
  end

  def new
    @category = Category.new
  end

  def create
    category = Category.create(category_param)
  end

  private

  def category_param
    params.require(:category).permit(:name)
  end
end
