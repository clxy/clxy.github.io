<script setup lang="ts">
import MarkdownViewer from '@/components/markdown-viewer.vue'
</script>

<template>
  <UContainer>
    <div>Creation</div>

    <UCard variant="subtle">
      <template #header>
        <div class="text-right">TODO: Author and timestamp</div>
      </template>
      <div class="flex items-center justify-center gap-4">
        <MarkdownViewer filePath="gg-a-1.md" />
      </div>
      <template #footer>
        <div class="text-right">TODO: Author and timestamp</div>
      </template>
    </UCard>
  </UContainer>
</template>

<style scoped></style>

<route lang="yaml">
name: Creation
meta:
  title: Creation
  icon: i-mdi-lightbulb-on-outline
  order: 2
</route>
