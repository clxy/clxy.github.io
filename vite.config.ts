import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'

import Pages from 'vite-plugin-pages'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    // for nuxt-ui
    ui({
      prefix: 'U', // Default: 'U'。区分大小写
    }),

    // for vite-plugin-pages
    Pages({
      dirs: 'src',
      // 需要多个目录不同配置例子
      // dirs: [
      //   { dir: 'src', baseRoute: '/', filePattern: '**\/index.vue' },
      //   { dir: 'src', baseRoute: '/', filePattern: '**\/*Page.vue' },
      // ],
      exclude: [
        '**/components/*',
        '**/assets/*',
        'App.vue', 'main.ts', 'vite-env.d.ts',
      ],
    }),
  ],
})
