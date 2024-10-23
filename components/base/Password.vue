<script setup lang="ts">

interface Props {
  placeholder?: string,
  disabled?: boolean,
  toggleMask?: boolean,
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  disabled: false,
  toggleMask: false
})
const model = defineModel<string>({ default: '' })
const isMaskActive = ref(true)
const toggleMaskStatus = () => {
  isMaskActive.value = !isMaskActive.value
}
</script>

<template>
  <div class="relative w-full">
    <input
      v-model="model"
      :placeholder="props.placeholder"
      :type="isMaskActive ? 'password' : 'text'"
      class="w-full rounded-full border-2 border-black bg-white px-3 py-2 text-sm outline-0"
      :disabled="props.disabled"
      autocomplete="new-password"
    >
    <button
      v-if="props.toggleMask"
      class="absolute right-2 top-2"
      @click="toggleMaskStatus()"
    >
      <NuxtIcon
        v-if="isMaskActive"
        name="form:eye-off"
        size="24"
        class="text-black"
      />
      <NuxtIcon
        v-else
        name="form:eye-active"
        size="24"
        class="text-black"
      />
    </button>
  </div>
</template>
