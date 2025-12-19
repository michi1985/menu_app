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
        <h1 class="text-3xl font-bold text-gray-900">メニュー新規作成</h1>
      </div>

      <MenuForm submit-label="作成" @submit="handleSubmit" />

      <div
        v-if="error"
        class="mt-4 max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md"
      >
        <p class="font-medium">エラー</p>
        <p class="text-sm">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MenuFormData } from '~/types/menu'

const { createMenu } = useMenuApi()
const router = useRouter()

const error = ref<string | null>(null)

const handleSubmit = async (formData: MenuFormData) => {
  error.value = null

  try {
    await createMenu(formData)
    await router.push('/admin/menus')
  } catch (err) {
    error.value =
      err instanceof Error ? err.message : 'メニューの作成に失敗しました'
  }
}
</script>
