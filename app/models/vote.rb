class Vote < ApplicationRecord
  BLOGGABLE_LIMIT = 40
  enum vote_type: { downvote: -1, upvote: 1 }

  belongs_to :user
  belongs_to :post

  validates :user_id, uniqueness: { scope: :post_id }

  after_save :update_post_counters
  after_destroy :update_post_counters

  private

  def update_post_counters
    upvote_count = post.votes.upvote.count
    downvote_count = post.votes.downvote.count
    post.update!(
      upvotes: upvote_count,
      downvotes: downvote_count,
      is_bloggable: (upvote_count - downvote_count) >= BLOGGABLE_LIMIT
    )
  end
end
