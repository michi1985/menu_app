class AdminUsers::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: {
        message: "Signed up successfully.",
        admin_user: resource
      }, status: :ok
    else
      render json: {
        error: resource.errors.full_messages.join(", ")
      }, status: :unprocessable_entity
    end
  end
end
