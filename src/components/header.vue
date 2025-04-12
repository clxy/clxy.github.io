<script setup lang="ts">
import { ref, computed, } from 'vue'
import type { RouteRecordRaw } from 'vue-router'

import type { NavigationMenuItem } from '@nuxt/ui'

import { routes, } from '@/router'
import Logo from './logo.vue'

// 从routes meta里提取Menu Item信息
const route2MenuItem = (route: RouteRecordRaw, level = 1): NavigationMenuItem => {
  const menuItem = {
    label: route?.meta?.title as string | undefined,
    icon: route?.meta?.icon as string | undefined,
    to: route.path,
    defaultOpen: true,
  } as NavigationMenuItem

  if (route.children && level > 1) {
    console.log('route.children', route.children, level)
    menuItem.children = route.children.map(route2MenuItem, level - 1)
  }

  return menuItem
}

const hItems = ref([
  // [{ slot: 'header' }],
  routes.map((route) => route2MenuItem(route)),
  // [{ slot: 'tail' },]
])

const vItems = ref([routes.map((route) => route2MenuItem(route, 999))])

const showBookmarks = ref(true)
const showHistory = ref(false)
const showDownloads = ref(false)

const modeItems = computed(() => [
  {
    label: 'Light',
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
    label: 'Dark',
    icon: 'i-lucide-clock',
    type: 'checkbox' as const,
    checked: showHistory.value,
    onUpdateChecked(checked: boolean) {
      showHistory.value = checked
    }
  },
  {
    label: 'System',
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
  <header
    class="sticky top-0 z-50 border-b border-(--ui-border) bg-(--ui-background) justify-between flex">

    <div class="flex justify-between h-(--ui-header-height) my-3">
      <Logo />
    </div>

    <UNavigationMenu
      orientation="horizontal"
      :items="hItems"
      class="hidden lg:flex justify-between h-(--ui-header-height)">
    </UNavigationMenu>

    <div class="flex items-center justify-between h-(--ui-header-height)">
      <UDropdownMenu :items="modeItems" :content="{ align: 'start' }" :ui="{ content: 'w-48' }">
        <UButton label="" color="neutral" variant="outline" icon="i-mdi-sun-moon-stars" />
      </UDropdownMenu>

      <UButton
        label="" color="neutral" variant="outline" icon="i-mdi-github"
        to="https://github.com/clxy/clxy.github.io" target="_blank" />

      <USlideover side="right" v-model:open="slideoverState" class="lg:hidden">
        <UButton label="" color="neutral" variant="outline" icon="i-mdi-menu" />
        <template #header>
          <div class="flex items-center justify-between w-full h-(--ui-header-height)">
            <Logo :noLink="true" />
            <UButton @click="slideoverState = false" icon="i-mdi-arrow-right" variant="ghost" color="neutral" />
          </div>
        </template>
        <template #body>
          <div class="h-full">
            <UNavigationMenu
              orientation="vertical"
              :items="vItems"
              class="flex justify-between">
            </UNavigationMenu>
          </div>
        </template>
      </USlideover>
    </div>
  </header>
</template>

<style scoped></style>
