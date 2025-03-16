<script setup lang="ts">
import { ref, computed } from 'vue'
import type { NavigationMenuItem } from '@nuxt/ui'
import routes from '~pages'

import Logo from './logo.vue'

// 从routes meta里提取Menu信息
// TODO: route.path是分层的 比如 /app, /app/stock
const routesMeta: NavigationMenuItem[] = routes.map((route) => ({
  label: route?.meta?.title as string | undefined,
  icon: route?.meta?.icon as string | undefined,
  to: route.path
}))

const items = ref([
  [{ slot: 'header' }],
  [...routesMeta],
  [{ slot: 'tail' },]
])

const showBookmarks = ref(true)
const showHistory = ref(false)
const showDownloads = ref(false)

const modeItems = computed(() => [
  {
    label: 'Interface',
    icon: 'i-lucide-app-window',
    type: 'label' as const
  },
  { type: 'separator' as const },
  {
    label: 'Show Bookmarks',
    icon: 'i-lucide-bookmark',
    type: 'checkbox' as const,
    checked: showBookmarks.value,
    onUpdateChecked(checked: boolean) {
      showBookmarks.value = checked
    },
    onSelect(e: Event) {
      e.preventDefault()
    }
  },
  {
    label: 'Show History',
    icon: 'i-lucide-clock',
    type: 'checkbox' as const,
    checked: showHistory.value,
    onUpdateChecked(checked: boolean) {
      showHistory.value = checked
    }
  },
  {
    label: 'Show Downloads',
    icon: 'i-lucide-download',
    type: 'checkbox' as const,
    checked: showDownloads.value,
    onUpdateChecked(checked: boolean) {
      showDownloads.value = checked
    }
  }
])

const slideoverState = ref(false)
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-(--ui-border) bg-(--ui-background)">
    <UNavigationMenu
      orientation="horizontal"
      :items="items"
      class="flex items-center justify-between gap-3 h-(--ui-header-height)">
      <!-- class="max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8" -->

      <template #header>

        <USlideover side="left" v-model:open="slideoverState">
          <UButton label="" color="neutral" variant="outline" icon="i-mdi-menu" />
          <template #header>
            <div class="flex items-center justify-between w-full h-(--ui-header-height)">
              <Logo :noLink="true" />
              <UButton @click="slideoverState = false" icon="i-mdi-arrow-left" variant="ghost" color="neutral" />
            </div>
          </template>
          <template #body>
            <div class="h-full" />
          </template>
        </USlideover>

        <Logo />
      </template>

      <template #tail>
        <UDropdownMenu :items="modeItems" :content="{ align: 'start' }" :ui="{ content: 'w-48' }">
          <UButton label="" color="neutral" variant="outline" icon="i-mdi-sun-moon-stars" />
        </UDropdownMenu>

        <UButton
          label="" color="neutral" variant="outline" icon="i-mdi-github"
          to="https://github.com/clxy/clxy.github.io" target="_blank" />
      </template>
    </UNavigationMenu>
  </header>
</template>

<style scoped></style>
