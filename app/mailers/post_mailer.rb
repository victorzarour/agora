class PostMailer < ApplicationMailer

    def post_email(students, course)
        @students = students
        @course = course
        mail(to: @students.pluck(:email), subject: "Your Professor for #{@course} has posted a new announcement.")
    end

end
