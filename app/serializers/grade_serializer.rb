class GradeSerializer < ActiveModel::Serializer
  attributes :id, :letter_grade
  has_one :submission
end
