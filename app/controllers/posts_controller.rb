class PostsController < ApplicationController
  def index
    posts = Post.all
    render status: :ok, json: { posts: }
  end
  
  def new
    @post = Post.new
  end

  def create
    post = Post.create!(post_params)
  end

  def show
    post = Post.find_by!(slug: params[:slug])
    render status: :ok, json: { post: }
  end

  private

  def post_params
    params.require(:post).permit(:title, :description)
  end

end
