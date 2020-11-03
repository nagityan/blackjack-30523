class CreateDebts < ActiveRecord::Migration[6.0]
  def change
    create_table :debts do |t|
      t.references :user,foreign_key: true
      t.integer :debt_point,default: 0
      t.timestamps
    end
  end
end
