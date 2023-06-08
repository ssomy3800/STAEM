json.set! :storage_items do
  @purchased_items.each do |purchased_item|
    json.set! purchased_item.id do
      json.user_id purchased_item.user_id
      json.game_id purchased_item.game_id
      json.purchased purchased_item.purchased
    end
  end
end