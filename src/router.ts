
import { createRouter, createWebHistory, } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import autoRoutes from '~pages'

// console.log(`before sort`, autoRoutes)

const buildRoutes = (routes: any[]) => {
  /**
   * 为了先处理嵌套路由，
   * 按照路径长度降序排列路由
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
    const pathArray = route.path.split('/').filter((p: string) => p)
    if (pathArray.length <= 1) return // 根路由不需要处理

    // 查找父路由
    const parentPath = '/' + pathArray.slice(0, -1).join('/')
    const parent = routeMap.get(parentPath)
    if (parent) {
      // 添加到父路由的 children 中
      parent.children.push(routeMap.get(route.path))
      // 从根级别移除
      routeMap.delete(route.path)
    }
  })

  const result = Array.from(routeMap.values())
  return result
}

const routes: RouteRecordRaw[] = buildRoutes(autoRoutes)

const router = createRouter({
  routes: [
    { path: '/', redirect: '/home' },
    ...routes,
  ],
  history: createWebHistory()
  // 如果History模式不生效，可以尝试使用Hash模式
  // history: createWebHashHistory()
})

export default router
export { routes } // 导出路由列表