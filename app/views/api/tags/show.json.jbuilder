json.partial! 'api/tags/tag', tag: @tag
json.games do
  json.array!(@games) do |game|
    json.partial! 'api/games/game', game: game
    if game.images.attached?
      json.image game.images.first.url
    end
  end
end