class PointsController < ApplicationController
  protect_from_forgery :except => [:create]
  def index
      @join = User.left_joins(:point,:debt)
      @user_point = @join.order(point: :DESC).limit(5).pluck(:nickname,:point,:debt_point)
      @total = @user_point.map{ |point|
        point
        if point[2] == nil
            [point[0],point[1]]
        else
          [point[0],(point[1] - point[2])]
        end
      }
      # binding.pry
      if user_signed_in? && SnsCredential.exists?(user_id: current_user.id)
        @sns = SnsCredential.find_by(user_id: current_user.id)
        @image = @sns.image
      end
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
