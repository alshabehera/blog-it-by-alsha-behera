class FilterService
  def initialize(params)
    @params = params
  end

  def perform
    Post
      .includes(:categories, :user, :organization)
      .then { |posts| filter_by_title(posts) }
      .then { |posts| filter_by_status(posts) }
      .then { |posts| filter_by_category_ids(posts) }
      .order(created_at: :desc)
      .distinct
  end

  private

  def filter_by_title(posts)
    return posts unless @params[:title].present?

    posts.where('title LIKE ?", "%#{@params[:title]}%')
  end

  def filter_by_status(posts)
    return posts unless @params[:status].present?

    posts.where(status: @params[:status])
  end

  def filter_by_category_ids(posts)
    return posts unless @params[:category_ids].present?

    posts.joins(:categories).where(categories: { id: @params[:category_ids] })
  end
end
