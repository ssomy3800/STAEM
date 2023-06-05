json.array! @carted_items do |carted_item|
    json.id carted_item.id
    json.user_id carted_item.user_id
    json.game_id carted_item.game_id
    json.purchased carted_item.purchased
  end