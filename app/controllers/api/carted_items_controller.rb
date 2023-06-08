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
      
      @carted_item = CartedItem.find_by(game_id: params[:game_id], user_id: params[:user_id])

      if @carted_item.user == @user && @carted_item.destroy
        render json: { message: 'Carted item successfully removed' }
      else
        render json: { error: 'Failed to remove carted item' }, status: 422
      end
    end
    
    def update
      carted_item = CartedItem.find_by(game_id: carted_item_params[:game_id], user_id: @user.id, purchased: false)

      if carted_item && carted_item.update(purchased: true)
        render json: { message: 'CartedItem was successfully updated.' }, status: :ok
      else
        render json: carted_item ? carted_item.errors : { message: 'CartedItem not found' }, status: :unprocessable_entity
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
  