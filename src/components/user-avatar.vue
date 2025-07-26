<script setup lang="ts">
import { computed } from 'vue'

// 定义 props
const props = defineProps<{
  user: string
  size?: '3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
}>()

// 头像图片路径（可根据实际情况调整）
const avatarSrc = computed(() => `/assets/${props.user}.png`)
</script>

<template>
  <UTooltip :text="user">
    <UAvatar :src="avatarSrc" :size="size || 'md'" :alt="user" />
  </UTooltip>
</template>