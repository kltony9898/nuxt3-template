module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  parser: 'vue-eslint-parser',
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:tailwindcss/recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'tailwindcss'],
  rules: {
    'no-console': 'off',
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
    }],
    'tailwindcss/no-custom-classname': 'off'
  }
}
