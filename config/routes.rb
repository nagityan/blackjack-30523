Rails.application.routes.draw do
  devise_for :users, controllers: {
  omniauth_callbacks: 'users/omniauth_callbacks',
  registrations: 'users/registrations'
}
  root to: "points#index"
  resources :points,only:[:create]
  resources :debts,only:[:index,:create]

  
  
end
