// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: {
    enable: true
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
  vite: {
    esbuild: {
      drop: ['console']
    }
  }
})
