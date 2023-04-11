module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  parser: 'vue-eslint-parser',
  extends: [
    'standard',
    '@nuxtjs/eslint-config-typescript',
    'plugin:vue/vue3-recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [],
  rules: {},
  overrides: [
    {
      files: [
        '**/pages/**/*.{js,ts,vue}',
        '**/layouts/**/*.{js,ts,vue}',
        '**/app.{js,ts,vue}',
        '**/error.{js,ts,vue}'
      ],
      rules: {
        indent: 'off',
        '@typescript-eslint/indent': ['error', 2],
        'vue/multi-word-component-names': 'off'
      }
    }
  ]
}
