class SessionsController < ApplicationController
    skip_before_action :authorized_user, only: :create
    # POST '/login'

    def create
      professor = Professor.find_by(email: params[:email])
  
      if professor&.authenticate(params[:password])
        session[:user_id] = professor.id
        render json: professor, status: :ok
      else
        render json: { errors: 'Invalid Password or Username'}, status: :unauthorized
      end
  
    end
  
    # DELETE '/logout'
    def delete
      session.delete :user_id
    end
  
end
