class Api::LikesController < ApplicationController
    before_action :find_comment
    before_action :find_like, only: [:destroy]
  
    def create
      if already_liked?
        flash[:notice] = "You can't like more than once"
      else
        @comment.likes.create(user_id: current_user.id)
      end
      redirect_to comment_path(@comment)
    end
  
    def destroy
      if !(already_liked?)
        flash[:notice] = "Cannot unlike"
      else
        @like.destroy
      end
      redirect_to comment_path(@comment)
    end
  
    private
  
    def find_comment
      @comment = Comment.find(params[:comment_id])
    end
  
    def already_liked?
      Like.where(user_id: current_user.id, comment_id:
      params[:comment_id]).exists?
    end
  
    def find_like
      @like = @comment.likes.find(params[:id])
    end
  end
  