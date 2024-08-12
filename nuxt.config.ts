// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      baseApiUrl: process.env.NUXT_APP_BASE_API_URL
    }
  },
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
    '@vueuse/nuxt',
    '@nuxt/icon'
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
  },
  compatibilityDate: '2024-08-02',
  // - 重新更改Icon組建名稱
  icon: {
    componentName: 'NuxtIcon',
    customCollections: [
      {
        prefix: 'icon',
        dir: './assets/icons'
      }
    ]
  },
  // ignore page for development
  ignore: [
    process.env.NODE_ENV === 'production' ? 'pages/examples' : ''
  ]
})
