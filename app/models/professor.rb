class Professor < ApplicationRecord
    validates :email, uniqueness: true
    
    has_many :courses
    has_many :course_students, through: :courses
    has_many :students, through: :course_students

    has_secure_password
end
