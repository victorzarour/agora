class SessionsController < ApplicationController
    skip_before_action :authorized_user

    # POST '/login'
    def create
      professor = Professor.find_by(email: params[:email])
      student = Student.find_by(email: params[:email])
  
      if professor&.authenticate(params[:password])
        session[:user_id] = professor.id
        session[:is_prof] = 1
        render json: professor, status: :ok

      elsif student&.authenticate(params[:password])
        session[:user_id] = student.id
        session[:is_prof] = 0
        render json: student, status: :ok
       
      else
        render json: { errors: 'Invalid Password or Username'}, status: :unauthorized
      end
  
    end
  
    # DELETE '/logout'
    def delete
      session.delete :user_id
    end
  
end
