class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|

      t.string :username, null: false
      t.string :password_digest, null: false
      t.string :session_token, null: false
      # add any additional columns you plan to use
      t.timestamps
    end
      add_index :users, :session_token, unique: true
      add_index :users, :username, unique: true
  end
end
