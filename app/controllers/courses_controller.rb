class CoursesController < ApplicationController
    before_action :find_course, only: [:show, :update, :destroy]
    skip_before_action :authorized_user

    def index
        render json: Course.all
    end

    def show
        render json: @course
    end

    def create
        course = Course.create!(course_params)
        render json: course, status: :created
    end

    def update
        @course.update!(course_params)
        render json: @course, status: :ok
    end

    def destroy
        @course.destroy
        head :no_content
    end

    def course_assignments
        course = Course.find(params[:id])
        render json: course.assignments
    end

    def course_announcements
        course = Course.find(params[:id])
        render json: course.announcements.order(:created_at)
    end

    def course_discussions
        course = Course.find(params[:id])
        render json: course.discussions.order(:created_at)
    end
    
    private

    def course_params
        params.permit(:university, :title, :professor_id, :department, :days, :code)
    end

    def find_course
        @course = Course.find(params[:id])
    end
end
