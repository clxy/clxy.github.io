<script setup lang="ts">
import { ref, computed, h, resolveComponent, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CreationType, Works, type Work, typeOptions, authorOptions, type Option } from './const'

import type { TableColumn } from '@nuxt/ui'

const route = useRoute()
const router = useRouter()

// 过滤条件
const filter = ref({
  type: route.query.type?.toString() || 'all',
  author: route.query.author?.toString() || '',
  keyword: route.query.keyword?.toString() || ''
})
watch(filter, val => {
  router.replace({
    query: {
      ...route.query,
      type: val.type === 'all' ? undefined : val.type,
      author: val.author || undefined,
      keyword: val.keyword || undefined,
    }
  })
}, { deep: true })

const typeIcon = computed(() => typeOptions.find(o => o.value === filter.value.type)?.icon)
const authorOption = computed(() => authorOptions.find(o => o.value === filter.value.author))


// 检索结果
const data = computed(() =>
  Works
    .filter(work =>
      (filter.value.type === 'all' || work.type === filter.value.type)
      && (filter.value.author === 'all' || work.author.includes(filter.value.author))
      && (work.title.includes(filter.value.keyword) || work.desc.includes(filter.value.keyword))
    )
    .map((work) => {
      const cType = CreationType[work.type]
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
const UAvatar = resolveComponent('UserAvatar')

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
    meta: {
      class: {
        th: 'w-30 text-center',
        td: 'text-center',
      },
    },
    cell: ({ row }) => {
      return h(
        UAvatar,
        { user: row.original.author, },
        () => ''
      )
    }
  },
]

</script>

<template>
  <UContainer>
    <div>Creation</div>

    <UCard variant="subtle">
      <!--
      <template #header>
        <div class="text-left flex items-center gap-2">
          <UIcon name="i-mdi-magnify" />
        </div>
      </template>
      -->
      <div class="flex items-center justify-center gap-4">
        <USelect v-model="filter.author" :items="authorOptions" class="w-48"
          :avatar="authorOption?.avatar" :icon="authorOption?.icon" />
        <USelect v-model="filter.type" :items="typeOptions" class="w-48" :icon="typeIcon" />
        <UInput placeholder="Search..." v-model="filter.keyword">
          <template v-if="filter.keyword?.length" #trailing>
            <UButton
              color="neutral"
              variant="link"
              size="sm"
              icon="i-lucide-circle-x"
              aria-label="Clear input"
              @click="filter.keyword = ''" />
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
