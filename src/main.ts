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
})

app.use(router)
app.use(ui)

app.mount('#app')