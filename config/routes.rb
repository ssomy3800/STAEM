Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"


  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create] do
      resources :carted_items, path: 'cart', only: [:index, :create,:update]
      delete 'cart', to: 'carted_items#destroy'
      put 'cart', to: 'carted_items#update'
    end
    get 'users/:user_id/storage', to: 'carted_items#storage'
    
    resource :session, only: [:create, :show, :destroy]
    resources :games do
      resources :comments
    end
    
    resources :games, only: [:index, :show] do
      collection do
        get 'search/:name', to: 'games#search', as: 'search'
      end
      end

      resources :tags, only: [:index, :show] do
        get ':name', to: 'tags#show', on: :collection
      end
    
  end
  get '*path', to: "static_pages#frontend_index"
  


end
