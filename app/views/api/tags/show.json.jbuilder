json.partial! 'api/tags/tag', tag: @tag
json.games @games, partial: 'api/games/game', as: :game