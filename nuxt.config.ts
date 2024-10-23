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
    '@nuxt/icon',
    '@vee-validate/nuxt'
  ],
  imports: {
    dirs: ['stores']
  },
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL,
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
      },
      {
        prefix: 'form',
        dir: './assets/icons/form'
      },
      {
        prefix: 'examples',
        dir: './assets/icons/examples'
      }
    ]
  },
  // ignore page for development
  ignore: [
    // 只在生產環境中忽略以下頁面和組件
    ...(process.env.NODE_ENV === 'production'
      ? [
          'pages/examples',
          'components/examples',
          'composables/examples',
          'utils/examples',
          'stores/examples',
          'types/examples',
          'apis/examples',
          'assets/icons/examples',
          'server/api/examples'
        ]
      : [])
  ]
})
