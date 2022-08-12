class CourseSerializer < ActiveModel::Serializer
  attributes :id, :university, :title, :department, :days
  has_one :professor
  has_one :syllabus
  has_many :assignments
end
