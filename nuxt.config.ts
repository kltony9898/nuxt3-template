// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader'

export default defineNuxtConfig({
  ssr: false,

  devtools: {
    enabled: true
  },

  typescript: {
    typeCheck: true
  },

  modules: [
    ['@pinia/nuxt', {
      autoImports: [
        'defineStore',
        ['defineStore', 'definePiniaStore']
      ]
    }],
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt'
  ],

  imports: {
    dirs: ['stores']
  },

  app: {
    baseURL: process.env.NUXT_API_BASE_URL,
    buildAssetsDir: '/static/'
  },

  vite: {
    plugins: [
      svgLoader({
        svgo: false
      })
    ],
    esbuild: {
      drop: ['debugger'],
      pure: ['console.log', 'console.error', 'console.warn', 'console.debug', 'console.trace']
    }
  },
  compatibilityDate: '2024-07-31'
})
