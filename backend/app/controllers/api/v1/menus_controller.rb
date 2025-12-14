class Api::V1::MenusController < ApplicationController
  before_action :set_menu, only: [:show, :update, :destroy]

  # GET /api/v1/menus
  def index
    @menus = Menu.all
    render json: @menus
  end

  # GET /api/v1/menus/:id
  def show
    render json: @menu
  end

  # POST /api/v1/menus
  def create
    @menu = Menu.new(menu_params)

    if @menu.save
      render json: @menu, status: :created
    else
      render json: { errors: @menu.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/v1/menus/:id
  def update
    if @menu.update(menu_params)
      render json: @menu
    else
      render json: { errors: @menu.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/menus/:id
  def destroy
    @menu.destroy
    head :no_content
  end

  private

  def set_menu
    @menu = Menu.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Menu not found' }, status: :not_found
  end

  def menu_params
    params.require(:menu).permit(:name, :price, :category, :description, :is_published)
  end
end
