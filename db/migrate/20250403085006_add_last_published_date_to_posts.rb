# frozen_string_literal: true

class AddLastPublishedDateToPosts < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :last_published_date, :datetime
  end
end
