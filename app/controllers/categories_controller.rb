class CategoriesController < ApplicationController
  def index
    categories = Category.all
    render status: :ok, json: { categories: }
  end

  def new
    @category = Category.new
  end

  def create
    @category = Category.create(category_param)
    render json: @category, status: :created
  end

  private

  def category_param
    params.require(:category).permit(:name)
  end
end
