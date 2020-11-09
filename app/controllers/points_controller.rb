class PointsController < ApplicationController
  protect_from_forgery :except => [:create]
  def index
      @join = User.joins(:point,:debt).select("users.nickname,points.point,debts.debt_point")
      
      @total = @join.map{|point| 
        if point[:debt_point] == nil
                [point[:nickname],point[:point]]
        else
          [point[:nickname],(point[:point]-point[:debt_point]),"(#{point[:point]}-#{point[:debt_point]})"]
        end
      }
      @sort = @total.sort do |a, b|
        b[1] <=> a[1]
      end
      # binding.pry
      if user_signed_in?
        @point = current_user.point.point
      end
    end
  

  def create

    if not user_signed_in?
      return
    else 
        @update_point = Point.find_by(user_id: current_user.id)
        # if Debt.exists?(user_id: current_user.id) && params[:point].to_i != 0
        #   @remain = params[:point].to_i - current_user.debt.debt_point
        #   @update_point.update(point: @remain)
        # else
          @update_point.update(json_point)
        # end
        # binding.pry
      end   
    # binding.pry
    # else
    #     @point= Point.new(params_point)
    #   if Point.exists?(user_id: current_user.id)
    #     @update_point = Point.find_by(user_id: current_user.id)
    #     @update_point.update(params_point)
    #   else
    #     @point.save
    #   end
    # end
  end

  private
  def json_point
    params.permit(:point)
  end
end
