class Course < ApplicationRecord
  belongs_to :professor
  has_one :syllabus
  has_many :assignments
end
