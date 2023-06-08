json.extract! comment, :id, :content, :game_id, :user_id, :username, :likes
json.url comment_url(comment, format: :json)
