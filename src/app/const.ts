import { routeTree, } from '@/router'
import type { RouteRecordRaw } from 'vue-router'

interface AppItem {
  name: string
  icon: string
  color: string
  path: string
}

export const AppList: AppItem[] =
  routeTree
    .find((route: RouteRecordRaw) => route.path === '/app')
    ?.children
    ?.map((route: RouteRecordRaw) => {
      console.log(`route`, route)
      return {
        name: route.meta?.title as string,
        icon: route.meta?.icon as string,
        color: route.meta?.color as string,
        path: route.path,
      }
    }) || []
