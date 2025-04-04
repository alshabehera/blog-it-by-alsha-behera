class PostsController < ApplicationController
  before_action :set_post, only: %i[destroy update show]
  skip_before_action :authenticate_user_using_x_auth_token
  def index
    @posts = Post.includes(:categories, :user, :organization).order(created_at: :desc)
  end

  def new
    post = Post.new
  end

  def create
    post = Post.create(post_params)
    render_notice(t('post.create'))
  end

  def show
  end

  def update
    @post.update!(post_params)
    render_notice(t("post.update"))
  end

  def destroy
    return unless @post.destroy

    render_notice(t("post.delete"))
  end

  private

  def set_post
    @post = Post.includes(:categories, :user, :organization).find_by!(slug: params[:slug])
  end

  def post_params
    params.require(:post).permit(:title, :description, :status, :user_id, :organization_id, category_ids: [])
  end
end
