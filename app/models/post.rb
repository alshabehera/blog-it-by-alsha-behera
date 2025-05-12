class Post < ApplicationRecord
  enum status: { Publish: 0, Draft: 1 }
  has_and_belongs_to_many :categories
  has_many :votes, dependent: :destroy

  belongs_to :user
  belongs_to :organization

  validates :title, presence: true, length: { maximum: 125 }
  validates :description, presence: true, length: { maximum: 10_000 }
  validates_inclusion_of :is_bloggable, in: [true, false]
  validates :slug, uniqueness: true
  validate :slug_not_changed

  before_validation :set_slug, on: :create
  before_save :update_last_published_date

  def net_votes
    upvotes - downvotes
  end

  private

  def set_slug
    title_slug = title.parameterize
    regex_pattern = "slug #{Constants::DB_REGEX_OPERATOR} ?"
    latest_post_slug = Post.where(
      regex_pattern,
      "^#{title_slug}$|^#{title_slug}-[0-9]+$"
    ).order('LENGTH(slug) DESC', slug: :desc).first&.slug
    slug_count = 0
    if latest_post_slug.present?
      slug_count = latest_post_slug.split('-').last.to_i
      only_one_slug_exists = slug_count == 0
      slug_count = 1 if only_one_slug_exists
    end
    slug_candidate = slug_count.positive? ? "#{title_slug}-#{slug_count + 1}" : title_slug
    self.slug = slug_candidate
  end

  def slug_not_changed
    return unless will_save_change_to_slug? && persisted?

    errors.add(:slug, I18n.t('post.slug.immutable'))
  end

  def update_last_published_date
    self.last_published_date = Time.current if status == 'Publish'
  end
end
