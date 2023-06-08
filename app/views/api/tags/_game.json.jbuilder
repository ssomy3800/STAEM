json.extract! game, :id, :name, :description, :price, :developer, :release_date
json.set! :tag_names, game.tags.pluck(:name)