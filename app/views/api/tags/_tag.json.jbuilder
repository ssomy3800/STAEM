json.extract! tag, :id, :name
json.set! :games, tag.games.pluck(:title)