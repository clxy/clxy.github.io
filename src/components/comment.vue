<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '@/components/useTheme'
import  Giscus  from '@giscus/vue'

// 获取主题
const { currentTheme } = useTheme()
// 计算 giscus 支持的 theme 名称
const giscusTheme = computed(() => {
  if (currentTheme.value === 'light') return 'light'
  if (currentTheme.value === 'dark') return 'dark'
  return 'preferred_color_scheme'
})
const userLang = navigator.language || 'en'
const giscusLang = computed(() => userLang)
</script>

<template>
  <Giscus
    repo="clxy/clxy.github.io"
    repo-id="MDEwOlJlcG9zaXRvcnk1MzU3MzgxNg=="
    category="General"
    category-id="DIC_kwDOAzF4uM4Cs5Aw"
    mapping="url"
    reactions-enabled="1"
    emit-metadata="0"
    input-position="top"
    :theme="giscusTheme"
    :lang="giscusLang" />
</template>
