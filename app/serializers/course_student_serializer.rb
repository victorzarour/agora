class CourseStudentSerializer < ActiveModel::Serializer
  attributes :id, :course, :course_student_info
  # has_one :course
  # has_one :student
  has_many :submissions
end
