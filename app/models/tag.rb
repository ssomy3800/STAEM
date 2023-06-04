# == Schema Information
#
# Table name: tags
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Tag < ApplicationRecord
    validates :name, presence: true, uniqueness: true
    
    has_many :game_tags
    has_many :games, through: :game_tags
end
