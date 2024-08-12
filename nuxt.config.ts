// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader'

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
  ignore: [
    process.env.NODE_ENV === 'production' ? 'pages/examples' : ''
  ]
})
