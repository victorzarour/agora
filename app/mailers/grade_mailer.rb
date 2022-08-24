class GradeMailer < ApplicationMailer

    def grade_email(studentEmail, studentName, assignment, course)
        @studentEmail = studentEmail
        @studentName = studentName
        @assignment = assignment
        @course = course
        mail(to: @studentEmail, subject: "Your Professor for #{@course} has graded your assignment: #{@assignment}.")
    end

end
