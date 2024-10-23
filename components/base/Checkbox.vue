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
const model = defineModel<(string | number)[]>({ default: () => [] })

const updateValue = (value: string | number) => {
  const newValue = [...model.value]
  const index = newValue.indexOf(value)
  if (index === -1) {
    newValue.push(value)
  } else {
    newValue.splice(index, 1)
  }
  model.value = newValue
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
        :checked="model.includes(option.value)"
        :value="option.value"
        class="size-5 accent-black outline-black"
        type="checkbox"
        :disabled="props.disabled"
        @change="updateValue(option.value)"
      >
      <span class="pl-2">{{ option.name }}</span>
    </div>
  </div>
</template>
