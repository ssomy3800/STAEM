class AddFieldsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :firstname, :string
    add_column :users, :lastname, :string
    add_column :users, :email, :string

    add_index :users, :firstname
    add_index :users, :lastname
    add_index :users, :email, unique: true
  end
end
