json.extract! post,
:id,
:slug,
:title,
:created_at,
:description

json.categories post.categories, :id, :name

json.user do
json.extract! post.user,
 :id,
 :name
end