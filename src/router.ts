
import { createRouter, createWebHistory, } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import autoRoutes from '~pages'

/**
 * 为了菜单准备的，带有父子嵌套关系的路由树
 */
const buildRouteTree = (routes: any[]) => {
  /**
   * 为了处理嵌套路由，
   * 按照路径长度降序排列路由
   * 在各个路由中的meta里面添加了order属性，但没有使用
   */
  routes.sort((a, b) => {
    const aPath = a.path.split('/').filter((p: string) => p).length
    const bPath = b.path.split('/').filter((p: string) => p).length
    return bPath - aPath
  })

  // console.log(`after sort`, routes)

  const routeMap = new Map<string, any>()

  // 首先将所有路由添加到 map 中
  routes.forEach(route => routeMap.set(route.path, {
    ...route,
    children: []
  }))

  routes.forEach((route) => {
    const path = route.path
    const pathArray = path.split('/').filter((p: string) => p)
    if (pathArray.length <= 1) return // 根路由不需要处理

    // 查找父路由
    const parentPath = '/' + pathArray.slice(0, -1).join('/')
    const parent = routeMap.get(parentPath)
    if (parent) {
      parent.children.push(routeMap.get(path))
      routeMap.delete(path)
    }
  })

  const result = Array.from(routeMap.values())
  return result
}

// 菜单用嵌套路由树
const routeTree: RouteRecordRaw[] = buildRouteTree(autoRoutes)
// console.log(`routes`, routes)

const router = createRouter({
  routes: [
    { path: '/', redirect: '/home' },
    // 路由本身不嵌套
    ...autoRoutes,
  ],
  history: createWebHistory()
  // 如果History模式不生效，可以尝试使用Hash模式
  // history: createWebHashHistory()
})

export default router
export { routeTree } // 导出路由列表