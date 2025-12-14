class CreateMenus < ActiveRecord::Migration[7.2]
  def change
    create_table :menus do |t|
      t.string :name, null: false
      t.integer :price, null: false
      t.string :category, null: false
      t.text :description
      t.boolean :is_published, default: false, null: false

      t.timestamps
    end
  end
end
