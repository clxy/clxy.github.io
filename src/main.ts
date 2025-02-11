import './assets/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import ui from '@nuxt/ui/vue-plugin'
import App from './App.vue'
import routes from '~pages'

console.log(routes)

const app = createApp(App)

const router = createRouter({
  routes: routes,
  history: createWebHistory()
  // 如果History模式不生效，可以尝试使用Hash模式
  // history: createWebHashHistory()
})

app.use(router)
app.use(ui)

app.mount('#app')