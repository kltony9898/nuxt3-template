<script setup lang="ts">
type Option = {
  name: string,
  value: string | number
}

interface Props {
  options: Option[],
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false
})

const model = defineModel<string | number>({ default: '' })

const updateValue = (value: string | number) => {
  model.value = value
}
</script>

<template>
  <div>
    <div
      v-for="(option, index) in props.options"
      :key="index"
      class="flex items-center"
    >
      <input
        :checked="model === option.value"
        :value="option.value"
        class="size-5 accent-black outline-black"
        type="radio"
        :disabled="props.disabled"
        @change="updateValue(option.value)"
      >
      <span class="pl-2">{{ option.name }}</span>
    </div>
  </div>
</template>
