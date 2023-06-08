class CartedItem < ApplicationRecord
  belongs_to :user
  belongs_to :game
  validates :game_id, uniqueness: { scope: [:user_id, :purchased], message: "should only have one carted item per game per user where purchased is false" }
  validates :user_id, uniqueness: { scope: :game_id }
end
