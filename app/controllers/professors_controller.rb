class ProfessorsController < ApplicationController
    skip_before_action :authorized_user, only: [:show, :create]

    def show
      render json: current_user, status: :ok
    end
  
    def create
      professor = Professor.create!(professor_params)
      render json: professor, status: :created
    end
  
    private
  
    def professor_params
      params.permit(:first_name, :last_name, :email, :password)
    end
  
end
