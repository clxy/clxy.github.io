import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ui from '@nuxt/ui/vite'

import Pages from 'vite-plugin-pages'

// https://vite.dev/config/
export default defineConfig({
  // base: '/',
  build: { outDir: 'docs' },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 方便引入
      // 动态组件用到 template: '<component :is="component" />'，需要下面的
      // 要么老老实实分开文件写，要么用下面的完整版
      // vue: 'vue/dist/vue.esm-bundler.js', // 使用完整版
    }
  },
  plugins: [
    vue(),

    // for nuxt-ui
    ui({
      prefix: 'U', // Default: 'U'。区分大小写
    }),

    /**
     * 自动注册路由
     */
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
        '**/*.ts',
        'App.vue',
      ],
    }),
  ],
})
