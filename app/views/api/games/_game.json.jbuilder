

json.extract! game, :id, :title, :short_description, :long_description, :publisher, :developer, :price, :publish_date
json.set! :tags, game.tags.pluck(:name)
