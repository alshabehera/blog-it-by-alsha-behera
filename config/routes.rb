Rails.application.routes.draw do
  constraints(lambda { |req| req.format == :json }) do
  resources :posts, only: %i[index create new show], param: :slug
  resources :categories, only: %i[index create new]
  resources :users, only: %i[index create]
  end
  root 'home#index'
  get '*path', to: 'home#index', via: :all
end
