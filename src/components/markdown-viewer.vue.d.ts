declare module '@/components/markdown-viewer.vue' {
  import { DefineComponent } from 'vue'

  interface MarkdownViewerProps {
    filePath: string
  }

  const MarkdownViewer: DefineComponent<MarkdownViewerProps>
  export default MarkdownViewer
}
