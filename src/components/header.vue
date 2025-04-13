<script setup lang="ts">
import { ref, computed, } from 'vue'
import { useRouter, } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { NavigationMenuItem } from '@nuxt/ui'

import { routeTree, } from '@/router'
import { useTheme } from './useTheme'
import Logo from './logo.vue'

const router = useRouter()

// 从routes meta里提取Menu Item信息
const route2MenuItem = (route: RouteRecordRaw, level = 1): NavigationMenuItem => {
  const isActive = router.currentRoute.value.path.startsWith(route.path)
  const menuItem = {
    label: route?.meta?.title as string | undefined,
    icon: route?.meta?.icon as string | undefined,
    to: route.path,
    defaultOpen: true,
    active: isActive
  } as NavigationMenuItem

  // 父节点有path时，打开关闭同时，也跳转（← 默认只打开关闭）
  menuItem.onSelect = (e: Event) => {
    // console.log(`menuItem.onSelect`, menuItem)
    e.preventDefault()
    if (menuItem.to) { router.push(menuItem.to) }
  }

  if (route.children && level > 1) {
    // console.log('route.children', route.children, level)
    menuItem.children = route.children.map(route2MenuItem, level - 1)
  }

  return menuItem
}

// 水平菜单
const hMenuItems = computed(() => [
  // [{ slot: 'header' }], // 头部插槽
  routeTree.map((route) => route2MenuItem(route)),
  // [{ slot: 'tail' },] // 尾部插槽
])
// 垂直菜单
const vMenuItems = computed(() => routeTree.map((route) => route2MenuItem(route, 999)))

// Theme
const { themeItems, } = useTheme()

// 侧边栏菜单开闭状态
const slideoverState = ref(false)
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-(--ui-border) bg-(--ui-bg)/75 backdrop-blur justify-between flex">

    <div class="flex justify-between h-(--ui-header-height) my-3">
      <Logo />
    </div>

    <UNavigationMenu
      orientation="horizontal"
      :items="hMenuItems"
      class="hidden md:flex justify-between h-(--ui-header-height)">
    </UNavigationMenu>

    <div class="flex items-center justify-between h-(--ui-header-height)">
      <UDropdownMenu :items="themeItems" :content="{ align: 'start' }" :ui="{ content: 'w-48' }">
        <UButton label="" color="neutral" variant="outline" icon="i-mdi-sun-moon-stars" />
      </UDropdownMenu>

      <UButton
        label="" color="neutral" variant="outline" icon="i-mdi-github"
        to="https://github.com/clxy/clxy.github.io" target="_blank" />

      <USlideover side="right" v-model:open="slideoverState" class="md:hidden">
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
              highlight
              orientation="vertical"
              :items="vMenuItems"
              class="flex justify-between">
            </UNavigationMenu>
          </div>
        </template>
      </USlideover>
    </div>
  </header>
</template>

<style scoped></style>
