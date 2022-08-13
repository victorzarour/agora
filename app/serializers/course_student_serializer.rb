class CourseStudentSerializer < ActiveModel::Serializer
  attributes :id
  has_one :course
  has_one :student
end
