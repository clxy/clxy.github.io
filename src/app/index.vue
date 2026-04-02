<script setup lang="ts">
import { AppList } from './const'
console.log(`AppList`, AppList)
</script>

<template>
  <UCard variant="subtle">
    <div class="flex items-center justify-center gap-4">
      <UButton
        v-for="(app, index) in AppList"
        :key="index"
        :icon="app.icon"
        :color="app.color"
        :to="app.path"
        :title="app.name"
        variant="outline"
        size="xl" />
    </div>
  </UCard>
</template>

<style scoped></style>

<route lang="yaml">
name: App
meta:
  title: App
  icon: i-mdi-app-badge-outline
  order: 3
</route>
