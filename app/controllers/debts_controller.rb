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

  def index
      @point = current_user.point.point
      @user_point = Point.find_by(user_id: current_user.id)
      @debt = current_user.debt.debt_point
      @user_debt = Debt.find_by(user_id: current_user.id)

    if @point > @debt
      @point = @point - @debt
      @debt = 0
      @user_point.update(point:@point)
      @user_debt.update(debt_point:@debt)
    else
      @debt = @debt - (@point - 5000)
      @point = 5000
      @user_point.update(point:@point)
      @user_debt.update(debt_point:@debt)
    end
    
    redirect_to root_path
  end
end
