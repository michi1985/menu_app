<template>
  <component
    :is="componentType"
    :to="to"
    :type="buttonType"
    :class="buttonClasses"
    @click="handleClick"
  >
    {{ label }}
  </component>
</template>

<script setup lang="ts">
interface Props {
  label: string
  variant?: 'primary' | 'danger' | 'secondary' | 'success'
  to?: string
  type?: 'button' | 'submit' | 'reset'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  type: 'button',
  size: 'md',
  to: undefined,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const componentType = computed(() => {
  return props.to ? resolveComponent('NuxtLink') : 'button'
})

const buttonType = computed(() => {
  return props.to ? undefined : props.type
})

const variantClasses = computed(() => {
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
  }
  return variants[props.variant]
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }
  return sizes[props.size]
})

const buttonClasses = computed(() => {
  return [
    'inline-flex items-center justify-center',
    'font-medium rounded-md',
    'transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variantClasses.value,
    sizeClasses.value,
  ].join(' ')
})

const handleClick = (event: MouseEvent) => {
  if (!props.to) {
    emit('click', event)
  }
}
</script>
