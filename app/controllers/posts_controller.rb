class PostsController < ApplicationController
  skip_before_action :authenticate_user_using_x_auth_token
  def index
    @posts = Post.includes(:categories,:user,:organization).all
  end

  def new
    @post = Post.new
  end

  def create
    post = Post.new(post_params)
    if post.save
      post.categories = Category.where(id: params[:category_ids])
    end
  end

  def show
    @post = Post.includes(:categories, :user, :organization).find_by!(slug: params[:slug])
  end

  private

  def post_params
    params.require(:post).permit(:title, :description, :user_id, :organization_id, category_ids: [])
  end
end
