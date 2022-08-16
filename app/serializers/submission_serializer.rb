class SubmissionSerializer < ActiveModel::Serializer
  attributes :id, :file_url, :file, :file_name
  # has_one :assignment
  # has_one :student
  # has_one :file
end
