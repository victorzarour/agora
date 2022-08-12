class CreateCourses < ActiveRecord::Migration[7.0]
  def change
    create_table :courses do |t|
      t.string :university
      t.string :title
      t.belongs_to :professor, null: false, foreign_key: true
      t.string :department
      t.string :days

      t.timestamps
    end
  end
end
