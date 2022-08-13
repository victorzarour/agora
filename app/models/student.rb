class Student < ApplicationRecord
    validates :email, uniqueness: true
    
    has_many :course_students
    has_many :courses, through: :course_students
    has_secure_password
end
