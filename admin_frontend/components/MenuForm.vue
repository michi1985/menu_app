<template>
  <form @submit.prevent="handleSubmit" class="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
    <div class="mb-6">
      <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
        メニュー名 <span class="text-red-500">*</span>
      </label>
      <input
        id="name"
        v-model="formData.name"
        type="text"
        required
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="例: カレーライス"
      />
    </div>

    <div class="mb-6">
      <label for="price" class="block text-sm font-medium text-gray-700 mb-2">
        価格（円） <span class="text-red-500">*</span>
      </label>
      <input
        id="price"
        v-model="formData.price"
        type="number"
        min="0"
        required
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="例: 800"
      />
    </div>

    <div class="mb-6">
      <label for="category" class="block text-sm font-medium text-gray-700 mb-2">
        カテゴリー <span class="text-red-500">*</span>
      </label>
      <input
        id="category"
        v-model="formData.category"
        type="text"
        required
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="例: メイン"
      />
    </div>

    <div class="mb-6">
      <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
        説明
      </label>
      <textarea
        id="description"
        v-model="formData.description"
        rows="4"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="メニューの説明を入力してください"
      />
    </div>

    <div class="mb-6">
      <label class="flex items-center">
        <input
          v-model="formData.is_published"
          type="checkbox"
          class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <span class="ml-2 text-sm font-medium text-gray-700">公開する</span>
      </label>
    </div>

    <div class="flex gap-4">
      <button
        type="submit"
        :disabled="loading"
        class="flex-1 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {{ loading ? '送信中...' : submitLabel }}
      </button>
      <NuxtLink
        to="/admin/menus"
        class="flex-1 bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 text-center transition-colors"
      >
        キャンセル
      </NuxtLink>
    </div>

    <div v-if="error" class="mt-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-md">
      <p class="font-medium">エラー</p>
      <p class="text-sm">{{ error }}</p>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { MenuFormData } from '~/types/menu'

interface Props {
  initialData?: MenuFormData
  submitLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  submitLabel: '保存'
})

const emit = defineEmits<{
  submit: [data: MenuFormData]
}>()

const formData = ref<MenuFormData>({
  name: props.initialData?.name || '',
  price: props.initialData?.price || '',
  category: props.initialData?.category || '',
  description: props.initialData?.description || '',
  is_published: props.initialData?.is_published || false
})

const loading = ref(false)
const error = ref<string | null>(null)

const handleSubmit = async () => {
  loading.value = true
  error.value = null

  try {
    emit('submit', formData.value)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'エラーが発生しました'
  } finally {
    loading.value = false
  }
}

// initialData が変更された場合にフォームを更新
watch(() => props.initialData, (newData) => {
  if (newData) {
    formData.value = {
      name: newData.name,
      price: newData.price,
      category: newData.category,
      description: newData.description || '',
      is_published: newData.is_published
    }
  }
}, { deep: true })
</script>
