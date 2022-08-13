class AddCodeToCourses < ActiveRecord::Migration[7.0]
  def change
    add_column :courses, :code, :integer
  end
end
