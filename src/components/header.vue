<script setup lang="ts">
import { ref, computed } from 'vue'
import type { NavigationMenuItem } from '@nuxt/ui'
import routes from '~pages'

// 从routes meta里提取Menu信息
const routesMeta: NavigationMenuItem[] = routes.map((route) => ({
  label: route?.meta?.title as string | undefined,
  icon: route?.meta?.icon as string | undefined,
  to: route.path
}))

const items = ref([
  [
    { slot: 'logo' }
  ],
  [...routesMeta],
  [
    // {
    //   label: 'GitHub',
    //   icon: 'i-mdi-github',
    //   to: 'https://github.com/clxy/clxy.github.io',
    //   target: '_blank',
    //   external: true
    // },
    // 上面的配置不好使。使用下面的按钮代替。ULink的Bug的可能性很大！！！
    { slot: 'tail' },
  ]
])

const showBookmarks = ref(true)
const showHistory = ref(false)
const showDownloads = ref(false)

const modeItems = computed(() => [{
  label: 'Interface',
  icon: 'i-lucide-app-window',
  type: 'label' as const
}, {
  type: 'separator' as const
}, {
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
}, {
  label: 'Show History',
  icon: 'i-lucide-clock',
  type: 'checkbox' as const,
  checked: showHistory.value,
  onUpdateChecked(checked: boolean) {
    showHistory.value = checked
  }
}, {
  label: 'Show Downloads',
  icon: 'i-lucide-download',
  type: 'checkbox' as const,
  checked: showDownloads.value,
  onUpdateChecked(checked: boolean) {
    showDownloads.value = checked
  }
}])
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-(--ui-border) bg-(--ui-background)">
    <UNavigationMenu
      orientation="horizontal"
      :items="items"
      class="max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 h-(--ui-header-height)">

      <template #logo>
        <ULink to="/home">
          <img src="/assets/logo.png" alt="Nuxt UI" class="h-6 w-auto" />
        </ULink>
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
