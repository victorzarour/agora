class ProfessorSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :password_digest

  has_many :courses
end
