<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
const { locale, setLocale } = useI18n()

</script>

<template>
  <div class="h-screen w-screen">
    <div>
      {{ $t('index.email') }} / {{ $t('index.label.sex') }}
      <br>
      locale: {{ locale }}
      <br>
      <select
        v-model="locale"
        class="border border-black"
      >
        <option>zh-TW</option>
        <option>en-US</option>
      </select>

      <button
        class="border border-black px-2 py-1"
        @click="setLocale('en-US')"
      >
        {{ '英文' }}
      </button>
      <button
        class="border border-black px-2 py-1"
        @click="setLocale('zh-TW')"
      >
        {{ '中文' }}
      </button>
    </div>
  </div>
</template>
