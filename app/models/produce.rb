class Produce < ApplicationRecord
    has_many :GardenProduces
    validates :name, presence: true, format: { with: /\A[a-zA-Z]*\z/ } #check if the name has only letters
    validates :name, :uniqueness => {:case_sensitive => false} #only one produce of a particular name should exist
    validates :duration, presence: true, format: { with: /\A[0-9]*\z/ } #duration should only be numbers
end

# Hello
# Please log out of your accounts when done
# As punishment I deleted random lines of your code 