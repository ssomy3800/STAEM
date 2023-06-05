class Api::CartedItemsController < ApplicationController

  before_action :set_user
    def index
        @carted_items = CartedItem.where(user: @user, purchased: false)
        render :index
      end
    
      def storage
        @purchased_items = CartedItem.where(user: @user, purchased: true)
        render :storage
      end
  
    def create
        @carted_item = CartedItem.new(carted_item_params)
        @carted_item.user = current_user
        if @carted_item.save
          render :show
        else
          render json: @carted_item.errors.full_messages, status: 422
        end
      end
  
      def destroy
        @carted_item = CartedItem.find(params[:id])
        if @carted_item.user == @user && @carted_item.destroy
          render json: { message: 'Carted item successfully removed' }
        else
          render json: { error: 'Failed to remove carted item' }, status: 422
        end
      end

    private
    def set_user
        @user = User.find(params[:user_id])
      end
  
    def carted_item_params
      params.require(:carted_item).permit(:game_id, :purchased)
    end
  end
  