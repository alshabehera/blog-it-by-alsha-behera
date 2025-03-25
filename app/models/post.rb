class Post < ApplicationRecord
  has_and_belongs_to_many :categories

  belongs_to :user
  belongs_to :organization

  validates :title, presence: true, length: { maximum: 125 }
  validates :description, presence: true, length: { maximum: 10_000 }
  validates_inclusion_of :is_bloggable, in: [true, false]
  validates :slug, uniqueness: true
  validate :slug_not_changed

  before_create :set_slug

  private

  def set_slug
    title_slug = title.parameterize
    latest_post_slug = Post.where(
      'slug LIKE ? or slug LIKE ?',
      "#{title_slug}",
      "#{title_slug}-%"
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

    errors.add(:slug, 'is immutable!')
  end
end
