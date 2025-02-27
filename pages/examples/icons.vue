<script setup lang="ts">
const icons = await import.meta.glob('@/assets/icons/**/*.svg') as Record<string, () => Promise<Component>>
const iconList = Object.keys(icons).map(key => key.split('/assets/icons/')[1].split('.svg')[0])

const searchText = ref('')
const selectedIconName = ref('')

const copyMode:Ref<'icon-text' | 'xml'> = ref('icon-text')

const { copy, text } = useClipboard()

const filteredIconList = computed(() => {
  // ignore case search by search text
  const regex = new RegExp(searchText.value, 'i')
  return iconList.filter(item => regex.test(item))
})

const activeIcon = ref()

const iconName = computed(() => (fileName:string) => {
  const name = fileName.split('/')[1] || fileName.split('/')[0]
  const path = fileName.split('/')[1] ? fileName.split('/')[0] : ''

  return path ? `${path}:${name}` : `icon:${name}`
})

const copyedIcon = computed(() => {
  if (selectedIconName.value) {
    return selectedIconName.value
  }
  if (activeIcon.value) {
    return 'icon:anger'
  }
  return 'icon:joy'
})

const copyIcon = (icon:string) => {
  selectedIconName.value = icon
  const iconXml = `<NuxtIcon :name="${selectedIconName.value}" />`
  if (copyMode.value === 'icon-text') {
    return copy(selectedIconName.value)
  }
  return copy(iconXml)
}

</script>

<template>
  <div class="flex w-full flex-col items-center justify-center">
    <div class="mt-16 flex flex-col items-center gap-2">
      <input
        v-model="searchText"
        class="h-8 w-44 bg-slate-100 px-3"
        type="text"
      >
      <p>copy mode: </p>
      <div class="flex justify-start gap-2">
        <input
          id="icon-text"
          v-model="copyMode"
          type="radio"
          value="icon-text"
        >
        <label for="icon-text">icon-text</label>

        <input
          id="xml"
          v-model="copyMode"
          type="radio"
          value="xml"
        >
        <label for="two">xml</label>
      </div>

      <div class="flex items-center justify-center">
        <p>your copyed : {{ text }}</p>
        <NuxtIcon
          :name="copyedIcon"
          size="48"
          class="cursor-pointer"
          @click="activeIcon = !activeIcon"
        />
      </div>
    </div>
    <div class="mt-20 grid grid-cols-5 justify-center gap-3 px-[20%]">
      <div
        v-for="(icon,index) in filteredIconList"
        :key="index"
        class="flex min-w-[108px] cursor-pointer flex-col items-center justify-center rounded-lg p-4 shadow-lg transition-all duration-300 ease-in-out hover:bg-slate-100"
        @click="copyIcon(iconName(icon))"
      >
        <NuxtIcon
          :name="iconName(icon)"
          size="48"
          class="text-red-500"
        />
        <span>{{ icon }}</span>
      </div>
    </div>
  </div>
</template>
