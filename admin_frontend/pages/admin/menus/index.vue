<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8 flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-900">メニュー一覧</h1>
        <NuxtLink
          to="/admin/menus/new"
          class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
        >
          + 新規作成
        </NuxtLink>
      </div>

      <div v-if="pending" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p class="mt-4 text-gray-600">読み込み中...</p>
      </div>

      <div v-else-if="error" class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
        <p class="font-medium">エラー</p>
        <p class="text-sm">{{ error.message }}</p>
      </div>

      <div v-else-if="menus && menus.length === 0" class="text-center py-12">
        <p class="text-gray-600">メニューが登録されていません</p>
      </div>

      <div v-else class="bg-white shadow-md rounded-lg overflow-hidden">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                メニュー名
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                価格
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                カテゴリー
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                公開状態
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="menu in menus" :key="menu.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ menu.id }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {{ menu.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ¥{{ menu.price.toLocaleString() }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ menu.category }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    menu.is_published
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  ]"
                >
                  {{ menu.is_published ? '公開中' : '非公開' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <NuxtLink
                  :to="`/admin/menus/${menu.id}/edit`"
                  class="text-blue-600 hover:text-blue-900"
                >
                  編集
                </NuxtLink>
                <button
                  @click="handleDelete(menu.id, menu.name)"
                  class="text-red-600 hover:text-red-900"
                >
                  削除
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="deleteError" class="mt-4 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
        <p class="font-medium">削除エラー</p>
        <p class="text-sm">{{ deleteError }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Menu } from '~/types/menu'

const { fetchMenus, deleteMenu } = useMenuApi()

const { data: menus, pending, error, refresh } = await useAsyncData<Menu[]>(
  'menus',
  () => fetchMenus()
)

const deleteError = ref<string | null>(null)

const handleDelete = async (id: number, name: string) => {
  if (!confirm(`「${name}」を削除してもよろしいですか？`)) {
    return
  }

  deleteError.value = null

  try {
    await deleteMenu(id)
    await refresh()
  } catch (err) {
    deleteError.value = err instanceof Error ? err.message : '削除に失敗しました'
  }
}
</script>
