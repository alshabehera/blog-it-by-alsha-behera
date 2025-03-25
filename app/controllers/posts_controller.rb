class PostsController < ApplicationController
  def index
    posts = Post.includes(:categories,:user).all
    render status: :ok, json: { posts: posts.as_json(include: { categories: {}, user: {} }) }
  end

  def new
    @post = Post.new
  end

  def create
    post = Post.new(post_params)
    if post.save
      post.categories = Category.where(id: params[:category_ids])
      render json: post, status: :created
    else
      render status: :unprocessable_entity, json: { errors: post.errors.full_messages }
    end
  end

  def show
    post = Post.includes(:categories, :user).find_by!(slug: params[:slug])
    render status: :ok, json: { post: post.as_json(include: { categories: {}, user: {} }) }
  end

  private

  def post_params
    params.require(:post).permit(:title, :description, :user_id, :organization_id, category_ids: [])
  end
end
