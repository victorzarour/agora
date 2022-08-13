class CourseSerializer < ActiveModel::Serializer
  attributes :id, :university, :title, :department, :days, :code
  has_one :professor
  has_one :syllabus
  has_many :assignments
  has_many :announcements
  has_many :discussions
end
