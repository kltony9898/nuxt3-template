<script setup lang="ts">
interface Props {
  placeholder?: string,
  type?: 'text' | 'account' | 'email',
  disabled?: boolean,
}
const model = defineModel<string | number>({ default: '' })
const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  disabled: false
})

</script>

<template>
  <div class="relative w-full">
    <input
      v-model="model"
      :placeholder="props.placeholder"
      :type="props.type"
      class="w-full rounded-full border-2 border-black bg-white px-3 py-2 text-sm text-black outline-0"
      :disabled="props.disabled"
      autocomplete="off"
    >
  </div>
</template>
