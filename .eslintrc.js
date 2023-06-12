module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  parser: 'vue-eslint-parser',
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:nuxt/recommended',
    'plugin:vue/vue3-recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint',
    'nuxt'
  ],
  rules: {
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2],
    'vue/multi-word-component-names': 'off',
    'vue/max-attributes-per-line': ['warn', {
      singleline: {
        max: 1
      },
      multiline: {
        max: 1
      }
    }],
    'vue/first-attribute-linebreak': ['warn', {
      singleline: 'beside',
      multiline: 'below'
    }]
  }
}
