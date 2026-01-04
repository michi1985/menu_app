module Api
  module V1
    class UsersController < ApplicationController
      before_action :authenticate_user!

      def me
        render json: current_user, status: :ok
      end

      private

      # Custom response for authentication failure
      def authenticate_user!
        super
      rescue StandardError
        render json: { error: "Unauthorized" }, status: :unauthorized
      end
    end
  end
end
