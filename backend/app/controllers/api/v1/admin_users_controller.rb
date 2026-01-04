module Api
  module V1
    class AdminUsersController < ApplicationController
      before_action :authenticate_admin_user!

      def me
        render json: current_admin_user, status: :ok
      end

      private

      # Custom response for authentication failure
      def authenticate_admin_user!
        super
      rescue StandardError
        render json: { error: "Unauthorized" }, status: :unauthorized
      end
    end
  end
end
