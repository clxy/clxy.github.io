import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

/**
 * 引入路由配置
 */
import { createRouter, createWebHistory } from 'vue-router'
import routes from '~pages'
console.log(routes)
const router = createRouter({
  routes: [
    { path: '/', redirect: '/home' },
    ...routes
  ],
  history: createWebHistory()
  // 如果History模式不生效，可以尝试使用Hash模式
  // history: createWebHashHistory()
})
app.use(router)

/**
 * 引入nuxt-ui
 */
import ui from '@nuxt/ui/vue-plugin'
app.use(ui)

app.mount('#app')