class ApplicationController < ActionController::API
  respond_to :json

  # Handle unauthorized access
  rescue_from CanCan::AccessDenied do |_exception|
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end

  # Custom unauthorized response for Devise
  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: resource
    else
      render json: { error: resource.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end
end
