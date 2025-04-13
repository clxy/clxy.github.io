<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 定义背景图片列表
const backgroundImages = [
  '/assets/intro-bg.jpg',
  '/assets/intro-bg1.jpg',
  '/assets/intro-bg2.jpg'
]

// 当前背景图片索引
const currentImageIndex = ref(0)

// 定时器逻辑
onMounted(() => {
  const interval = setInterval(() => {
    currentImageIndex.value = (currentImageIndex.value + 1) % backgroundImages.length
  }, 10 * 1000)

  // 清除定时器
  onUnmounted(() => {
    clearInterval(interval)
  })
})
</script>

<template>
  <div
    id="intro"
    class="flex flex-col items-center justify-center gap-4 h-80 md:h-120 w-full bg-cover bg-center "
    :style="{ backgroundImage: `url(${backgroundImages[currentImageIndex]})` }">
    <img src="/assets/logo.png">
    <div class="text-white my-1">To be is to do.</div>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
    <UCard variant="subtle">
      <template #header>
        <UButton icon="i-mdi-lightbulb-on-outline" to="/creation" variant="link">
          Creation
        </UButton>
      </template>
      <div class="flex items-center justify-center gap-4">
        <UButton icon="i-mdi-quill" size="xl" color="secondary" variant="outline" />
        <UButton icon="i-mdi-art" size="xl" color="warning" variant="outline" />
        <UButton icon="i-mdi-music-note-eighth" size="xl" color="error" variant="outline" />
      </div>
    </UCard>

    <UCard variant="subtle">
      <template #header>
        <UButton icon="i-mdi-app-badge-outline" to="/app" variant="link">
          App
        </UButton>
      </template>
      <div class="flex items-center justify-center gap-4">
        <UButton icon="i-mdi-chart-finance" size="xl" color="secondary" variant="outline"
          to="/app/stock" />
      </div>
    </UCard>
  </div>

  <footer>
    <div class="flex items-center justify-center gap-4">
      <USeparator type="solid" class="my-3 w-[80vw]" />
    </div>
    <div class="flex items-center justify-center gap-4 w-full">
      <UButton icon="i-mdi-email" to="mailto:j_clxy@hotmail.com" variant="link" color="info">
        联系我们
      </UButton>
      <UButton icon="i-mdi-shield-check" to="#" variant="link" color="info">
        隐私权政策
      </UButton>
    </div>
    <div class="flex items-center justify-center gap-4 w-full text-sm">
      <p>Copyright &copy; Clxy Studio All Rights Reserved</p>
    </div>
  </footer>
</template>

<style scoped>
#intro {
  transition: background-image 1s ease-in-out;
}
</style>

<route lang="yaml">
name: Home
meta:
  title: Home
  icon: i-mdi-house-outline
  order: 1
</route>
