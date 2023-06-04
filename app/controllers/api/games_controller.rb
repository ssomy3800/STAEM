

class Api::GamesController < ApplicationController
    def index
      @games = Game.all
    end
  
    def show
      @game = Game.find(params[:id])
    end
  
  private

  def game_params
    params.require(:game).permit(:title, :short_description, :long_description, :publisher, :developer, :price, :publish_date)
  end
end