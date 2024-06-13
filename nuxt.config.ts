// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: {
    enable: true
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
    'nuxt-icons',
    '@nuxt/devtools',
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
    esbuild: {
      drop: ['debugger'],
      pure: ['console.log', 'console.error', 'console.warn', 'console.debug', 'console.trace']
    }
  }
})
