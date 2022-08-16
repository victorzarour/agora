class Submission < ApplicationRecord
  belongs_to :assignment
  belongs_to :student

  has_one_attached :file

  def file_url
    Rails.application.routes.url_helpers.rails_blob_path(file, only_path: true, disposition: "attachment")
  end

  def file_name
    file.blob.filename
  end

end
