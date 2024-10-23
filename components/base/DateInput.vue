<script setup lang="ts">
interface Props {
  disabled?: boolean,
  max?: string,
  min?: string,
  placeholder?: string,
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  max: '',
  min: '',
  placeholder: ''
})

const model = defineModel<string | number>()

const year = ref(new Date().getFullYear())
const month = ref(new Date().getMonth() + 1)

const toBackMonth = () => {
  const backMonth = (month.value - 1) % 12 || 12
  if (backMonth === 12) {
    year.value -= 1
  }
  month.value = backMonth
}
const toNextMonth = () => {
  const nextMonth = (month.value + 1) % 12 || 12
  if (nextMonth === 1) {
    year.value += 1
  }
  month.value = nextMonth
}

const monthTextList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
]
const weekTextList = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const dateList = computed(() => {
  return useCalendar(year.value, month.value)
})

const dateElement = ref()

const calendarElement = ref()
const calendarStyle = ref({
  top: '0px',
  left: '0px',
  width: '100%'
})

onClickOutside(calendarElement, () => setCalendarActiveStatus(false))

const isCalendarActive = ref(false)
const setCalendarActiveStatus = (isActive: boolean) => {
  isCalendarActive.value = isActive

  const triggerRect = dateElement.value?.getBoundingClientRect()
  const offsetTop = triggerRect.top + triggerRect.height + 8

  calendarStyle.value = {
    top: `${offsetTop}px`,
    left: `${triggerRect.left}px`,
    width: '314px'
  }
}

const isDateEnable = (date: string) => {
  if (new Date(date).getMonth() !== month.value - 1) {
    return false
  }
  if (!!props.min && new Date(date) < new Date(props.min)) {
    return false
  }
  if (!!props.max && new Date(date) > new Date(props.max)) {
    return false
  }
  return true
}

</script>

<template>
  <div class="relative w-full">
    <button
      class="peer absolute left-0 top-0 size-full"
      @click="setCalendarActiveStatus(true)"
    />
    <input
      ref="dateElement"
      v-model="model"
      type="text"
      class="peer-hover:border-secondary pointer-events-none w-full rounded-full border-2 border-black bg-white py-2 pl-10 text-sm text-black outline-0"
      disabled
      autocomplete="off"
      :placeholder="props.placeholder"
    >
    <div
      v-if="isCalendarActive"
      ref="calendarElement"
      :style="calendarStyle"
      class="fixed z-10 rounded-md border-2 border-black bg-white px-5 py-3"
    >
      <header class="mb-6 flex items-center justify-between">
        <button @click="toBackMonth">
          <NuxtIcon
            name="form:arrow-left"
            size="24"
          />
        </button>
        <span class="text-sm text-black">{{ monthTextList[month - 1] }} {{ year }}</span>
        <button @click="toNextMonth">
          <NuxtIcon
            name="form:arrow-right"
            size="24"
          />
        </button>
      </header>
      <article class="grid grid-cols-7">
        <span
          v-for="weekText of weekTextList"
          :key="weekText"
          class="p-2 text-black"
        >
          {{ weekText }}
        </span>
        <button
          v-for="date of dateList"
          :key="date"
          class="rounded-md p-2"
          :class="[
            isDateEnable(date) ? 'text-black' : 'text-white',
            date === model && 'bg-black text-white'
          ]"
          :disabled="!isDateEnable(date)"
          @click="model = date"
        >
          {{ useDateFormat(date, 'DD').value }}
        </button>
      </article>
    </div>
    <NuxtIcon
      class="pointer-events-none absolute left-2 top-2"
      name="form:date"
      size="24"
    />
  </div>
</template>
