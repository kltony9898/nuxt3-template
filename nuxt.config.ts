// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: true,
  modules: [
    ['@pinia/nuxt', {
      autoImports: [
        'defineStore',
        ['defineStore', 'definePiniaStore']
      ]
    }],
    '@unocss/nuxt',
    'nuxt-icons',
    '@nuxt/devtools',
    '@vueuse/nuxt'
  ],
  imports: {
    dirs: ['stores']
  },
  css: [
    '@unocss/reset/tailwind.css'
  ],
  vite: {
    esbuild: {
        drop: ['console']
    }
  }
})
