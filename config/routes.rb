Rails.application.routes.draw do
  constraints(->(req) { req.format == :json }) do
    resources :posts, param: :slug do
      post 'vote', to: 'votes#create', as: :vote
      resource :report, only: %i[create], module: :posts do
        get :download
      end
    end

    resources :categories, only: %i[index create new]
    resources :users, only: %i[index create]
    resource :session, only: %i[create destroy]
  end

  root 'home#index'
  get '*path', to: 'home#index', via: :all
end
