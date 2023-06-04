json.partial! "api/games/game", game: @game
json.images @game.images.map { |image| url_for(image) }