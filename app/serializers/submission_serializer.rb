class SubmissionSerializer < ActiveModel::Serializer
  attributes :id, :file_url, :file_name, :student_id, :student_name, :assignment
  # has_one :assignment
  # has_one :student
  # has_one :file
end
