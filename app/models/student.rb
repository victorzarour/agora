class Student < ApplicationRecord
    validates :email, uniqueness: true
    
    has_many :course_students, dependent: :destroy
    has_many :courses, through: :course_students
    has_many :discussion_posts, dependent: :destroy
    has_secure_password
end
