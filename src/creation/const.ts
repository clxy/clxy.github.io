/**
 * Creation types and works
 */
interface CreationTypeItem {
  name: string
  color: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  icon: string
}
export const CreationType: Record<string, CreationTypeItem> = {
  'article': { name: '文章', color: 'secondary', icon: 'i-mdi-quill', },
  'music': { name: '音乐', color: 'error', icon: 'i-mdi-music-note-eighth', },
  'painting': { name: '绘画', color: 'warning', icon: 'i-mdi-art', },
} as const

/**
 * 作品
 */
export interface Work {
  type: string
  author: string
  cid: string
  ext: string
  title: string
  description: string
}
/**
 * File path assets/creation/
 * - yh-m-1.wav
 * - gg-a-1.md
 */
export const Works: Work[] = [
  {
    type: 'music', author: 'yh', cid: 'yh-m-1', ext: 'wav',
    title: '美妙的旋律',
    description: '一首动听的音乐作品，展现了作者的音乐才华。',
  },
  {
    type: 'article', author: 'gg', cid: 'gg-a-1', ext: 'md',
    title: '从进化心理学到AI',
    description: '一篇对进化心理学和AI话题的娱乐化演绎。',
  },
]