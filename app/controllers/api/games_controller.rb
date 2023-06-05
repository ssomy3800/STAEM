

class Api::GamesController < ApplicationController
    def index
      if params[:search].present?
        @games = Game.where("title ILIKE ?", "%#{params[:search]}%")
      else
        @games = Game.all
      end
    end
  
    def show
      @game = Game.find(params[:id])
    end
    def search
      if params[:name].present?
        @games = Game.where("title ILIKE ?", "%#{params[:name]}%")
      else
        @games = []
      end
      render :index
    end
  
  private

  def game_params
    params.require(:game).permit(:title, :short_description, :long_description, :publisher, :developer, :price, :publish_date)
  end
end