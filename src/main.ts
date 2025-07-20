import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'


const app = createApp(App)

/**
 * 引入router
 */
import router from './router'
app.use(router)

/**
 * 引入nuxt-ui
 */
import ui from '@nuxt/ui/vue-plugin'
app.use(ui)

app.mount('#app')