class CourseStudentSerializer < ActiveModel::Serializer
  attributes :id, :course
  has_one :course
  has_one :student
end
