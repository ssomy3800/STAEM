json.extract! game, :id
json.set! :tag_names, game.tags.pluck(:name)