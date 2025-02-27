<script setup lang="ts">
type Option = {
  name: string,
  value: string | number
}

interface Props {
  options: Option[],
  placeholder?: string,
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '',
  disabled: false,
  initialValue: ''
})
const model = defineModel<string | number>()

const nameValue = computed(() => props.options.find(option => option.value === model.value)?.name || '')

const optionsElement = ref<HTMLElement>()
const optionsStyle = ref({
  top: '0px',
  left: '0px',
  width: '100%'
})

const isOptionsActive = ref(false)

const setOptionsStatus = (status: boolean) => {
  isOptionsActive.value = status
  if (status && dropdown.value) {
    const triggerRect = dropdown.value?.getBoundingClientRect()
    const offsetTop = triggerRect.top + triggerRect.height + 8

    optionsStyle.value = {
      top: `${offsetTop}px`,
      left: `${triggerRect.left}px`,
      width: `${triggerRect.width}px`
    }
  }
}

const clickOption = (optionValue: string | number) => {
  model.value = optionValue
  setOptionsStatus(false)
}

const dropdown = ref()

onClickOutside(dropdown, () => setOptionsStatus(false))

</script>

<template>
  <div class="relative w-full">
    <div
      ref="dropdown"
      class="relative w-full"
    >
      <NuxtIcon
        name="form:dropdown"
        size="24"
        class="absolute right-2 top-2 text-black"
      />
      <button
        class="absolute left-0 top-0 size-full"
        :disabled="props.disabled"
        @click="setOptionsStatus(true)"
      />
      <input
        :value="nameValue"
        :placeholder="props.placeholder"
        type="text"
        class="pointer-events-none w-full rounded-full border-2 border-black bg-white px-3 py-2 text-sm text-black outline-0"
        disabled
        autocomplete="off"
      >
      <ul
        v-if="isOptionsActive"
        ref="optionsElement"
        class="fixed z-10 max-h-[216px] overflow-auto rounded-md border-2 border-black bg-white"
      >
        <li
          v-for="option of props.options"
          :key="option.value"
          class="cursor-pointer px-4 py-2"
          :class="model === option.value? 'bg-black text-white' : 'text-black bg-white hover:text-white hover:bg-black'"
          @click="clickOption(option.value)"
        >
          {{ option.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
