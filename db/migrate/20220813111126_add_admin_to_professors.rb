class AddAdminToProfessors < ActiveRecord::Migration[7.0]
  def change
    add_column :professors, :admin, :boolean, default: true
  end
end
