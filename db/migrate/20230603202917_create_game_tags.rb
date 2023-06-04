class CreateGameTags < ActiveRecord::Migration[7.0]
  def change
    create_table :game_tags do |t|
      t.references :game, null: false, foreign_key: true
      t.references :tag, null: false, foreign_key: true

      t.timestamps
    end
  end
end
