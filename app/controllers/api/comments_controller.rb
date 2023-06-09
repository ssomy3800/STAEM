class Api::CommentsController < ApplicationController
    before_action :set_comment, only: [:show, :update, :destroy]
  
    def index
      @comments = Comment.where(game_id: params[:game_id])
      render json: @comments
    end
  
    def show
      render json: @comment
    end
  
    def create
      @comment = Comment.new(comment_params)
      @comment.username = current_user.username
     
  
      if @comment.save
        render json: @comment, status: :created
      else
        render json: @comment.errors, status: :unprocessable_entity
      end
    end
  
    def update
      if @comment.update(comment_params)
        render json: @comment
      else
        render json: @comment.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @comment.destroy
    end
  
    private
  
    def set_comment
      @comment = Comment.find(params[:id])
    end
  
    def comment_params
      params.require(:comment).permit(:content, :game_id, :user_id,:likes)
    end
  end