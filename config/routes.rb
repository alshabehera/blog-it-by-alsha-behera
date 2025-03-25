Rails.application.routes.draw do
  resources :posts, only: %i[index create new show], param: :slug
  resources :categories, only: %i[index create new]
  root 'home#index'
  get '*path', to: 'home#index', via: :all
end
