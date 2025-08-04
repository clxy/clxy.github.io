<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useTheme } from '@/components/useTheme'
import Giscus from '@giscus/vue'

const props = defineProps<{
  id?: string
  url?: string
  showCount?: boolean
}>()

const instanceId = ref(props.id || Math.random().toString(36).substring(2))

// 主题
const { currentTheme } = useTheme()
const giscusTheme = computed(() => {
  if (currentTheme.value === 'light') return 'light'
  if (currentTheme.value === 'dark') return 'dark'
  return 'preferred_color_scheme'
})

// 语言
const userLang = navigator.language || 'en'
const giscusLang = computed(() => userLang)

// 评论数
const commentCount = ref(0)

/**
 * memo:
 *  Giscus 组件
 *  ・ 没有提供获取评论数的 API
 *  ・ event里面除了iframe是事件源，没有能识别的标识符
 *  ・ 如果隐藏/放置去屏幕外，则不加载，也不触发事件，彻底不起作用
 *  因此需要在 showCount 为 true 时，先加载 Giscus 取得件数后，再删除
 *  目前没有更好的办法 ...
 */
function handleMessage(event: MessageEvent) {
  const giscusWidget =
    document.querySelector(`div[data-instance="${instanceId.value}"]`)
      ?.querySelector('giscus-widget')
  const iframe = giscusWidget?.shadowRoot?.querySelector('iframe') as HTMLIFrameElement | null

  if (event.origin !== 'https://giscus.app') return
  if (!iframe || event.source !== iframe.contentWindow) return

  const discussion = event.data?.giscus?.discussion
  if (discussion) commentCount.value = discussion.totalCommentCount

  if (props.showCount) { giscusWidget?.remove() }
}

onMounted(() => window.addEventListener('message', handleMessage))

onUnmounted(() => window.removeEventListener('message', handleMessage))

</script>

<template>
  <div :data-instance="instanceId">
    <div v-if="showCount" class="text-sm">
      <div class="giscus-hidden">
        <Giscus
          repo="clxy/clxy.github.io"
          repo-id="MDEwOlJlcG9zaXRvcnk1MzU3MzgxNg=="
          category="General"
          category-id="DIC_kwDOAzF4uM4Cs5Aw"
          :mapping="url ? 'specific' : 'url'"
          :term="url"
          reactions-enabled="0"
          emit-metadata="1" />
      </div>
      <span class="comment-count">{{ commentCount }}</span>
    </div>

    <div v-else>
      <Giscus
        repo="clxy/clxy.github.io"
        repo-id="MDEwOlJlcG9zaXRvcnk1MzU3MzgxNg=="
        category="General"
        category-id="DIC_kwDOAzF4uM4Cs5Aw"
        :mapping="url ? 'specific' : 'url'"
        :term="url"
        reactions-enabled="1"
        emit-metadata="0"
        input-position="top"
        :theme="giscusTheme"
        :lang="giscusLang" />
    </div>
  </div>
</template>
<style scoped>
.giscus-hidden {
  visibility: hidden;
  width: 1px !important;
  height: 1px !important;
}
</style>