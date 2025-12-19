<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <NuxtLink
          to="/admin/menus"
          class="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          ← メニュー一覧に戻る
        </NuxtLink>
        <h1 class="text-3xl font-bold text-gray-900">メニュー編集</h1>
      </div>

      <div v-if="pending" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
        ></div>
        <p class="mt-4 text-gray-600">読み込み中...</p>
      </div>

      <div
        v-else-if="error"
        class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md"
      >
        <p class="font-medium">エラー</p>
        <p class="text-sm">{{ error.message }}</p>
      </div>

      <MenuForm
        v-else-if="menu"
        :initial-data="formData"
        submit-label="更新"
        @submit="handleSubmit"
      />

      <div
        v-if="updateError"
        class="mt-4 max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md"
      >
        <p class="font-medium">エラー</p>
        <p class="text-sm">{{ updateError }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Menu, MenuFormData } from '~/types/menu'

const route = useRoute()
const router = useRouter()
const { fetchMenu, updateMenu } = useMenuApi()

const id = computed(() => Number(route.params.id))

const {
  data: menu,
  pending,
  error,
} = await useAsyncData<Menu>(`menu-${id.value}`, () => fetchMenu(id.value))

const formData = computed<MenuFormData | undefined>(() => {
  if (!menu.value) return undefined
  return {
    name: menu.value.name,
    price: menu.value.price,
    category: menu.value.category,
    description: menu.value.description,
    is_published: menu.value.is_published,
  }
})

const updateError = ref<string | null>(null)

const handleSubmit = async (formData: MenuFormData) => {
  updateError.value = null

  try {
    await updateMenu(id.value, formData)
    await router.push('/admin/menus')
  } catch (err) {
    updateError.value =
      err instanceof Error ? err.message : 'メニューの更新に失敗しました'
  }
}
</script>
