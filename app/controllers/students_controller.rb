class StudentsController < ApplicationController
    skip_before_action :authorized_user, :admin_user

    def show
      render json: current_user, status: :ok
    end
  
    def create
      student = Student.create!(student_params)
      session[:user_id] = student.id
      session[:is_prof] = 0
      render json: student, status: :created
    end

    def student_courses
      student = Student.find(params[:id])
      render json: student.courses
    end

    private
  
    def student_params
      params.permit(:first_name, :last_name, :email, :password)
    end
  
end
