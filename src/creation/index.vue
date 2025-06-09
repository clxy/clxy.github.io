<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const items = ref(['article', 'painting', 'music'])
const route = useRoute()
const value = ref('article')
const type = route.query.type
if (type && items.value.includes(type as string)) {
  value.value = type as string
}
</script>

<template>
  <UContainer>
    <div>Creation</div>

    <UCard variant="subtle">
      <template #header>
        <div class="text-left flex items-center gap-2">
          <UIcon name="i-mdi-magnify" />
        </div>
      </template>
      <div class="flex items-center justify-center gap-4">
        <UFormField label="Type">
          <USelect v-model="value" :items="items" class="w-48" />
        </UFormField>
      </div>
      <!-- <template #footer>
      </template> -->
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
