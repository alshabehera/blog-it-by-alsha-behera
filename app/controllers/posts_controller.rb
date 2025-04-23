# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :load_post, only: %i[destroy update show]
  skip_before_action :authenticate_user_using_x_auth_token
  def index
    @posts = Post.includes(:categories, :user, :organization).order(created_at: :desc)
  end

  def create
    Post.create!(post_params)
    render_notice(t('post.create'))
  end

  def show; end

  def update
    @post.update!(post_params)
    render_notice(t('post.update'))
  end

  def destroy
    @post.destroy!
    render_notice(t('post.delete'))
  end

  private

  def load_post
    @post = Post.includes(:categories, :user, :organization).find_by!(slug: params[:slug])
  end

  def post_params
    params.require(:post).permit(:title, :description, :status, :user_id, :organization_id, category_ids: [])
  end
end
