class Menu < ApplicationRecord
  validates :name, presence: true
  validates :price, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :category, presence: true
  validates :description, presence: true, length: { maximum: 255 }
end
