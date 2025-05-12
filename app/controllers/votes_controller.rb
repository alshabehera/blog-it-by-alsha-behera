class VotesController < ApplicationController
  before_action :load_post!

  def create
    vote = @post.votes.find_or_initialize_by(user: current_user)

    if vote.vote_type == params[:vote_type].to_i
      vote.destroy
    else
      vote.update(vote_type: params[:vote_type])
    end
  end

  private

  def load_post!
    @post = Post.find_by!(slug: params[:post_slug])
  end
end
