class AssignmentsController < ApplicationController    
    before_action :find_assignment, only: [:show, :update, :destroy]
    skip_before_action :authorized_user

    def index
        render json: Assignment.all
    end

    def show
        render json: @assignment
    end

    def create
        assignment = Assignment.create!(assignment_params)
        render json: assignment, status: :created
    end

    def update
        @assignment.update!(syllabus_entry_params)
        render json: @assignment, status: :ok
    end

    def destroy
        @assignment.destroy
        head :no_content
    end
    
    private

    def assignment_params
        params.permit(:title, :description, :due_date, :course_id)
    end

    def find_assignment
        @assignment = Assignment.find(params[:id])
    end
end
