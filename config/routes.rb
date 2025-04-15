Rails.application.routes.draw do
  constraints(->(req) { req.format == :json }) do
    resources :posts, param: :slug
    resources :categories, only: %i[index create new]
    resources :users, only: %i[index create]
    resource :session, only: %i[create destroy]
  end
  root 'home#index'
  get '*path', to: 'home#index', via: :all
end
