Rails.application.routes.draw do
  resources :professors

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#delete'

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end