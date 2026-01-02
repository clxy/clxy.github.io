<template>
  <div v-html="htmlContent" class="prose dark:prose-invert max-w-none"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MarkdownIt from 'markdown-it'
import collapsible from 'markdown-it-collapsible'

const props = defineProps < {
  filePath: string
} > ()

const htmlContent = ref('')
const md = new MarkdownIt({ html: true, linkify: true })
md.use(collapsible)

onMounted(async () => {
  try {
    const response = await fetch(`/assets/creation/${props.filePath}`)
    if (response.ok) {
      const markdown = await response.text()
      htmlContent.value = md.render(markdown)
    } else {
      htmlContent.value = `<p>Error loading file: ${props.filePath}</p>`
    }
  } catch (error: unknown) {
    htmlContent.value = `<p>Error: ${error}</p>`
  }
})
</script>

<style scoped>
summary {
  list-style: none;
  cursor: pointer;

  /* Safari 需额外设置 */
  &::-webkit-details-marker {
    display: none;
  }
}

/* 添加自定义箭头动画 */
summary::after {
  content: "▶";
  display: inline-block;
  margin-left: 1rem;
  transition: transform 0.2s ease;
}

details[open] summary::after {
  transform: rotate(90deg);
}

/* Add border styles for details */
details {
  border: 1px solid #d1d5db; /* Tailwind's border-gray-300 */
  border-radius: 0.375rem; /* Tailwind's rounded-md */
  padding: 1rem; /* Tailwind's p-4 */
  transition: border-color 0.2s ease;
  margin-bottom: 0.25rem;
}

:deep(h2) {
  border-bottom: 1px solid currentColor;
  padding-bottom: 0.5rem;
}

:deep(.article-head-img img) {
  max-width: 50%;
  border-radius: 0.375rem;
  height: auto;
  display: block;
  margin: 0 auto;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
  filter: drop-shadow(0 8px 18px rgba(0, 0, 0, 0.18));
}
@media (prefers-color-scheme: dark) {
  details {
    border-color: #4b5563; /* Tailwind's dark:border-gray-600 */
  }
}

</style>
