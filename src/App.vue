<script setup lang="ts">
import { ref } from 'vue'
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
    {
      slot: 'components'
    }
  ],
  [...routesMeta],
  [
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      badge: '3.8k',
      to: 'https://github.com/nuxt/ui',
      target: '_blank'
    }
  ]
])
</script>

<template>
  <UApp>
    <header class="sticky top-0 z-50 border-b border-(--ui-border) bg-(--ui-background)">
      <UNavigationMenu
        orientation="horizontal"
        :items="items"
        class="max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 h-(--ui-header-height)">
        <template #components>
          <ULink to="/home">
            <img src="/assets/logo.png" alt="Nuxt UI" class="h-6 w-auto" />
          </ULink>
        </template>
      </UNavigationMenu>
    </header>

    <RouterView />
  </UApp>
</template>

<style scoped></style>
