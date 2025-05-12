json.extract! post,
              :id,
              :slug,
              :title,
              :status,
              :created_at,
              :updated_at,
              :description,
              :last_published_date,
              :is_bloggable,
              :upvotes,
              :downvotes

json.formatted_last_published_date post.last_published_date&.strftime('%b %d, %Y, %I:%M %p')

json.categories post.categories, :id, :name

json.user do
  json.extract! post.user,
                :id,
                :name
end

json.organization do
  json.extract! post.organization,
                :id,
                :name
end
