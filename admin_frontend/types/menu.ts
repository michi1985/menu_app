export interface Menu {
  id: number
  name: string
  price: number
  category: string
  description?: string
  is_published: boolean
  created_at?: string
  updated_at?: string
}

export interface MenuFormData {
  name: string
  price: number | string
  category: string
  description?: string
  is_published: boolean
}
