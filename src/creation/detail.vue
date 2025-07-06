<script setup lang="ts">
import MarkdownViewer from '@/components/markdown-viewer.vue'
import { useRoute } from 'vue-router'
import { CreationType, Works, type Work } from './const'

const route = useRoute()
const urlId = route.query.id?.toString()
console.log('route query id:', urlId)
const work = Works.find(work => work.cid === urlId)
</script>

<template>
  <UContainer>

    <template v-if="!work">
      <UCard variant="subtle" color="error">
        <template #header>
          <div class="text-red-500 font-bold">啥？你愁啥？！</div>
        </template>
        <div class="flex items-center justify-center gap-4">
          <span>未找到对应的作品，请检查链接是否正确。</span>
        </div>
      </UCard>
    </template>

    <template v-else>
      <UCard variant="subtle">
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon :name="CreationType[work.type]?.icon"
              :color="CreationType[work.type]?.color" />
            <span>{{ work.title }}</span>
            <span class="ml-auto text-sm text-gray-400">by {{ work.author }}</span>
          </div>
        </template>
        <div class="flex items-center justify-center gap-4">
          <template v-if="work.ext === 'md'">
            <MarkdownViewer :filePath="`${work.cid}.md`" />
          </template>
          <template v-else-if="work.ext === 'wav'">
            <audio :src="`/assets/creation/${work.cid}.wav`" controls style="width: 100%;" />
          </template>
          <template v-else-if="work.type === 'painting'">
            <img :src="`/assets/creation/${work.cid}.jpg`" :alt="work.title" class="max-w-full max-h-96" />
          </template>
          <template v-else>
            <span class="text-red-500">Can't show {{ work.cid }}.{{ work.ext }}</span>
          </template>
        </div>
        <template #footer>
          <div class="text-right">TODO: Author and timestamp</div>
        </template>
      </UCard>
    </template>
  </UContainer>
</template>

<style scoped></style>

<route lang="yaml">
name: CreationDetail
meta:
  title: Creation
  icon: i-mdi-lightbulb-on-outline
  order: 2
</route>
