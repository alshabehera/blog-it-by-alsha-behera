Rails.application.routes.draw do
  resources :posts, only: :index

  root 'home#index'
end
