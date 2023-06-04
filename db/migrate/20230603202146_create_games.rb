class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.string :title, null: false, index: { unique: true }
      t.text :short_description, null: false
      t.text :long_description, null: false
      t.string :publisher, null: false
      t.string :developer, null: false
      t.float :price, null: false
      t.date :publish_date, null: false
      t.timestamps
    end
  end
end
