import { defineNuxtConfig } from 'nuxt/config'
import ViteVuetify from 'vite-plugin-vuetify'
import { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  build: {
    transpile: ['vuetify'],
  },

  vite: {
    plugins: [
      ViteVuetify({ autoImport: true })
    ],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  compatibilityDate: '2024-08-29',
})