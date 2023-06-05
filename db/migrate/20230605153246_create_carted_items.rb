class CreateCartedItems < ActiveRecord::Migration[7.0]
  def change
    create_table :carted_items do |t|
      t.references :user, null: false, foreign_key: true
      t.references :game, null: false, foreign_key: true
      t.boolean :purchased, default: false

      t.timestamps
    end
    add_index :carted_items, [:user_id, :game_id], unique: true
  end
end
