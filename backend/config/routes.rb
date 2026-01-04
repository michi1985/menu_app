Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  # Devise routes for User
  devise_for :users, path: 'api/v1/users',
             controllers: {
               sessions: 'users/sessions',
               registrations: 'users/registrations'
             }

  # Devise routes for AdminUser
  devise_for :admin_users, path: 'api/v1/admin_users',
             controllers: {
               sessions: 'admin_users/sessions',
               registrations: 'admin_users/registrations'
             }

  namespace :api do
    namespace :v1 do
      resources :menus

      # Current user endpoint
      get 'me', to: 'users#me'

      # Current admin user endpoint (optional)
      get 'admin/me', to: 'admin_users#me'
    end
  end
end
