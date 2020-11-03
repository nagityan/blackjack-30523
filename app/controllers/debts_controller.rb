class DebtsController < ApplicationController
  def create
    # binding.pry
    if Debt.exists?(user_id: current_user.id)
      @update_point = Debt.find_by(user_id: current_user.id)
      total = @update_point.debt_point + 5000
      @update_point.update(debt_point:total)

      @point = Point.find_by(user_id: current_user.id)
      @total = @point.point + 5000
      @point.update(point:@total)
      # binding.pry
      
      redirect_to root_path
    else
    @debt = Debt.new(debt_point:5000,user_id:current_user.id)
    @update_point = Point.find_by(user_id: current_user.id)
      total = @update_point.point + 5000
      @update_point.update(point:total)
      if @debt.save
        redirect_to root_path
      else
        render action: :index
      end
    end
  end
end
