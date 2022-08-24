class ProfessorsController < ApplicationController
    skip_before_action :authorized_user
    skip_before_action :admin_user

    def show
      render json: current_user, status: :ok
    end
  
    def create
      if Student.where(email: params[:email]).exists?
        render json: { errors: "Email has already been taken" }, status: :unprocessable_entity
      else
        professor = Professor.create!(professor_params)
        session[:user_id] = professor.id
        session[:is_prof] = 1
        if professor.save
          UserMailer.welcome_email(professor).deliver_now
        end
        render json: professor, status: :created
      end
    end

    def update
      professor = Professor.find(params[:id])
      professor.update!(professor_params)
      render json: professor, status: :ok
    end

    def destroy
      professor = Professor.find(params[:id])
      professor.destroy
      head :no_content
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
