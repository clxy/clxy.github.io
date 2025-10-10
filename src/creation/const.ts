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
  'game': { name: '游戏', color: 'success', icon: 'i-mdi-google-gamepad', },
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
  desc: string
}
/**
 * File path assets/creation/
 * - yh-m-1.wav
 * - gg-a-1.md
 */
export const Works: Work[] = [
  {
    cid: 'yh-m-1', author: 'yh',
    type: 'music', ext: 'm4a',
    title: '沉思',
    desc: '2025年寒假录给奶奶的音乐作品',
  },
  {
    cid: 'gg-a-1', author: 'gg',
    type: 'article', ext: 'md',
    title: '从进化心理学到AI',
    desc: '一篇对进化心理学和AI话题的娱乐化演绎',
  },
  {
    cid: 'gg-a-2', author: 'gg',
    type: 'article', ext: 'md',
    title: '游戏项目企划概要书',
    desc: '把自己知道的喂给2个AI，在合并生成的内容，得到怎么个样的概要书',
  },
  {
    cid: 'yh-g-1', author: 'yh',
    type: 'game', ext: 'html',
    title: '躲避箭雨',
    desc: 'scratch作品',
  },
]

export interface Option {
  label: string
  value: string
  icon?: string
  avatar?: { src: string }
}

export const TypeAll: Option = {
  label: '全部',
  value: 'all',
  icon: ''
}

export const typeOptions: Option[] = [
  { ...TypeAll, icon: 'i-mdi-view-dashboard' },
  ...Object.entries(CreationType).map(([value, item]) => ({
    label: item.name,
    value,
    icon: item.icon
  }))
]

export const authorOptions: Option[] = [
  { ...TypeAll, icon: 'i-mdi-people-group-outline' },
  ...Array
    .from(new Set(Works.map(w => w.author)))
    .map(a => ({ label: a, value: a, avatar: { src: `/assets/${a}.png`, } }))
]
