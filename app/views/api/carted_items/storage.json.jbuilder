json.set! :carted_items do
  @purchased_items.each do |carted_item|
    json.set! carted_item.id do
      json.user_id carted_item.user_id
      json.game_id carted_item.game_id
      json.purchased carted_item.purchased
    end
  end
end