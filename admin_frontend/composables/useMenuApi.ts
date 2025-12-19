import type { Menu, MenuFormData } from '~/types/menu'

export const useMenuApi = () => {
  const config = useRuntimeConfig()
  const baseUrl = config.public.apiBaseUrl

  // メニュー一覧を取得
  const fetchMenus = async (): Promise<Menu[]> => {
    const data = await $fetch<Menu[]>(`${baseUrl}/api/v1/menus`)
    return data
  }

  // メニュー詳細を取得
  const fetchMenu = async (id: number): Promise<Menu> => {
    const data = await $fetch<Menu>(`${baseUrl}/api/v1/menus/${id}`)
    return data
  }

  // メニューを作成
  const createMenu = async (menuData: MenuFormData): Promise<Menu> => {
    const data = await $fetch<Menu>(`${baseUrl}/api/v1/menus`, {
      method: 'POST',
      body: {
        menu: {
          ...menuData,
          price: Number(menuData.price),
        },
      },
    })
    return data
  }

  // メニューを更新
  const updateMenu = async (
    id: number,
    menuData: MenuFormData
  ): Promise<Menu> => {
    const data = await $fetch<Menu>(`${baseUrl}/api/v1/menus/${id}`, {
      method: 'PUT',
      body: {
        menu: {
          ...menuData,
          price: Number(menuData.price),
        },
      },
    })
    return data
  }

  // メニューを削除
  const deleteMenu = async (id: number): Promise<void> => {
    await $fetch(`${baseUrl}/api/v1/menus/${id}`, {
      method: 'DELETE',
    })
  }

  return {
    fetchMenus,
    fetchMenu,
    createMenu,
    updateMenu,
    deleteMenu,
  }
}
