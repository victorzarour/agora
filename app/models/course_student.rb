class CourseStudent < ApplicationRecord
  validates :course, uniqueness: { scope: :student }

  belongs_to :course
  belongs_to :student
end
