class StudentsController < ApplicationController
    skip_before_action :authorized_user, only: [:show, :create, :student_courses]

    def show
      render json: current_user, status: :ok
    end
  
    def create
      student = Student.create!(student_params)
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
