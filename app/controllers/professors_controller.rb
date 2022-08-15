class ProfessorsController < ApplicationController
    skip_before_action :authorized_user
    skip_before_action :admin_user, only: [:show, :create]

    def show
      render json: current_user, status: :ok
    end
  
    def create
      professor = Professor.create!(professor_params)
      session[:user_id] = professor.id
      session[:is_prof] = 1
      render json: professor, status: :created
    end

    def professor_courses
      professor = Professor.find(params[:id])
      render json: professor.courses
    end

    private
  
    def professor_params
      params.permit(:first_name, :last_name, :email, :password)
    end
  
end
