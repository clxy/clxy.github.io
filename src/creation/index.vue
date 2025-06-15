<script setup lang="ts">
import { ref, computed, h, resolveComponent } from 'vue'
import { useRoute } from 'vue-router'
import { CreationType, Works, type Work } from './const'

import type { TableColumn } from '@nuxt/ui'

// Map CreationType object to array of items
const items = [
  {
    label: '全部',
    value: 'all',
    icon: ''
  },
  ...Object.entries(CreationType).map(([value, item]) => ({
    label: item.name,
    value,
    icon: item.icon
  }))
]

// Type
const route = useRoute()
const urlType = route.query.type?.toString()
const findType = ref<string>(urlType || 'all')
const icon = computed(() => items.find(item => item.value === findType.value)?.icon)

// keyword
const findKeyword = ref<string>('')

// list data
const data = computed(() =>
  Works
    .filter(work => (findType.value === 'all' || work.type === findType.value)
      && (work.title.includes(findKeyword.value) || work.description.includes(findKeyword.value)))
    .map((work) => {
      const cType = CreationType[work.type as keyof typeof CreationType]
      return {
        ...work,
        icon: cType?.icon || '',
        color: cType?.color || 'primary'
      } as WorkColumn
    })
)

interface WorkColumn extends Work {
  icon: string
  color: string
}

const UButton = resolveComponent('UButton')
const columns: TableColumn<WorkColumn>[] = [
  {
    header: '#',
    cell: ({ row }) => `${(row.index + 1)}`,
    meta: {
      class: {
        td: 'w-16 whitespace-normal',
      },
    },
  },
  {
    accessorKey: 'title',
    header: '标题',
    cell: ({ row }) => {
      // console.log(JSON.stringify(row))
      const icon = row.original.icon
      return h(
        UButton,
        {
          icon: icon,
          color: row.original.color,
          variant: 'ghost',
          size: 'xl',
          to: `/creation/detail?id=${row.original.cid}`,
        },
        () => `${row.getValue('title')}`
      )
    }
  },
  {
    accessorKey: 'author',
    header: '作者',
    cell: ({ row }) => `${row.getValue('author')}`,
    meta: {
      class: {
        th: 'w-30 text-center',
        td: 'text-center',
      },
    },
  },
]

</script>

<template>
  <UContainer>
    <div>Creation</div>

    <UCard variant="subtle">
      <!-- <template #header>
        <div class="text-left flex items-center gap-2">
          <UIcon name="i-mdi-magnify" />
        </div>
      </template> -->
      <div class="flex items-center justify-center gap-4">
        <USelect v-model="findType" :items="items" class="w-48" :icon="icon" onchange="" />
        <UInput placeholder="Search..." v-model="findKeyword">
          <template v-if="findKeyword?.length" #trailing>
            <UButton
              color="neutral"
              variant="link"
              size="sm"
              icon="i-lucide-circle-x"
              aria-label="Clear input"
              @click="findKeyword = ''" />
          </template>
        </UInput>
        <!-- <UFormField label="Type">
          <USelect v-model="value" :items="items" class="w-48" :icon="icon" />
        </UFormField> -->
      </div>
      <!-- <template #footer>
      </template> -->
    </UCard>
    <UCard variant="subtle" class="mt-4">
      <UTable sticky :data="data" class="flex max-h-[312px]" :columns="columns" />
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
