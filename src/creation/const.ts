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
  createdAt: string
}
/**
 * File path assets/creation/
 * - yh-m-1.wav
 * - gg-a-1.md
 */
export const Works: Work[] = [
  {
    cid: 'gg-p-2', author: 'gg',
    type: 'painting', ext: 'md',
    title: '静态画添加动态效果！',
    desc: '用Seedance2给静态画添加动态效果',
    createdAt: '2026-03-24',
  },
  {
    cid: 'gg-a-8', author: 'gg',
    type: 'article', ext: 'md',
    title: '氛围编程之毛1：AI辅助UI设计',
    desc: 'Antigravity + Pencil MCP',
    createdAt: '2026-04-02',
  },
  {
    cid: 'gg-a-7', author: 'gg',
    type: 'article', ext: 'md',
    title: '氛围编程？编毛咧！',
    desc: '氛围编程其实是程序员们在为将来的自己挖坑 ... 😂',
    createdAt: '2026-03-06',
  },
  {
    cid: 'gg-a-6', author: 'gg',
    type: 'article', ext: 'md',
    title: '特么到底算谁的？',
    desc: '我的，我的，我的 ... by 海鸥@海底总动员',
    createdAt: '2026-03-01',
  },
  {
    cid: 'gg-a-5', author: 'gg',
    type: 'article', ext: 'md',
    title: '智能＝记忆＋推理？',
    desc: '我对智能的理解，也是我对AI的期望',
    createdAt: '2026-02-23',
  },
  {
    cid: 'gg-a-4', author: 'gg',
    type: 'article', ext: 'md',
    title: '神，涌现和AI',
    desc: '涌现即道！一篇神神叨叨的思考',
    createdAt: '2026-01-15',
  },
  {
    cid: 'gg-a-3', author: 'gg',
    type: 'article', ext: 'md',
    title: '从卢德运动到程序员和AI',
    desc: '一篇对卢德运动和AI的思考',
    createdAt: '2026-01-02',
  },
  {
    cid: 'gg-p-1', author: 'gg',
    type: 'painting', ext: 'png',
    title: 'AI作图练习-浮空岛',
    desc: 'Gemini辅助创作。虽然各种细节都不太对，但意思到了！',
    createdAt: '2025-11-24',
  },
  {
    cid: 'yh-g-1', author: 'yh',
    type: 'game', ext: 'html',
    title: '躲避箭雨',
    desc: 'Scratch作品',
    createdAt: '2025-10-10',
  },
  {
    cid: 'gg-a-2', author: 'gg',
    type: 'article', ext: 'md',
    title: '游戏项目企划概要书',
    desc: '把自己知道的喂给2个AI，在合并生成的内容，得到怎么个样的概要书',
    createdAt: '2025-08-10',
  },
  {
    cid: 'yh-m-1', author: 'yh',
    type: 'music', ext: 'm4a',
    title: '沉思',
    desc: '2025年寒假录给奶奶的音乐作品',
    createdAt: '2025-01-23',
  },
  {
    cid: 'gg-a-1', author: 'gg',
    type: 'article', ext: 'md',
    title: '从进化心理学到AI',
    desc: '一篇对进化心理学和AI话题的娱乐化演绎',
    createdAt: '2024-12-15',
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
