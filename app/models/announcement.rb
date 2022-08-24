class Announcement < ApplicationRecord
  belongs_to :course
  has_one :professor, through: :course
  has_many :students, through: :course

end
