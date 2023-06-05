# == Schema Information
#
# Table name: games
#
#  id                :bigint           not null, primary key
#  title             :string           not null
#  short_description :text             not null
#  long_description  :text             not null
#  publisher         :string           not null
#  developer         :string           not null
#  price             :float            not null
#  publish_date      :date             not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#
class Game < ApplicationRecord
    has_many :carted_items
    has_many :users, through: :carted_items
    validates :title, presence: true, uniqueness: true
    validates :short_description, :long_description, :publisher, :developer, presence: true
    validates :price, presence: true, numericality: true
    validates :publish_date, presence: true
    has_many_attached :images
    has_one_attached :video
    has_many :game_tags
    has_many :tags, through: :game_tags
end
