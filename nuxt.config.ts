// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    ['@pinia/nuxt', {
      autoImports: [
        'defineStore',
        ['defineStore', 'definePiniaStore']
      ]
    }],
    'nuxt-svgo',
    '@nuxt/devtools'
  ],
  css: [
    '@unocss/reset/tailwind.css'
  ]
})
