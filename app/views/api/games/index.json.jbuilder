json.array! @games do |game|
  json.partial! "api/games/game", game: game
  json.images game.images.attached? ? game.images.map { |image| image.url } : []
  json.video game.video.attached? ? game.video.url : nil
end
