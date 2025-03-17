Rails.application.routes.draw do
  resources :posts, only: :index, param: :slug

  root 'home#index'
end
