class Api::TagsController < ApplicationController
  # GET /tags
  def index
    @tags = Tag.all
  end

  # GET /tags/:name
  def show
    @tag = Tag.find_by(name: params[:name])
    @games = @tag.games
  end
end
