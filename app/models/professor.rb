class Professor < ApplicationRecord
    validates :email, uniqueness: true
    
    has_many :courses
    has_secure_password
end
