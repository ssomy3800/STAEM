class AddUsernameAndLikesToComments < ActiveRecord::Migration[7.0]
  def change
    add_column :comments, :username, :string
    add_column :comments, :likes, :boolean
  end
end
