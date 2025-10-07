<script setup lang="ts">
const icons = await import.meta.glob('@/assets/icons/**/*.svg') as Record<string, () => Promise<Component>>
const iconList = Object.keys(icons).map(key => key.split('/assets/icons/')[1].split('.svg')[0])

const searchText = ref('')
const selectedIconName = ref('')
const copyMode = ref<'icon-text' | 'xml'>('icon-text')

const { copy, text } = useClipboard()

const filteredIconList = computed(() => {
  const regex = new RegExp(searchText.value, 'i')
  return iconList.filter(item => regex.test(item))
})

const iconName = computed(() => (fileName: string) => {
  const name = fileName.split('/')[1] || fileName.split('/')[0]
  const path = fileName.split('/')[1] ? fileName.split('/')[0] : ''
  return path ? `${path}:${name}` : `icon:${name}`
})

const copyIcon = (icon: string) => {
  selectedIconName.value = icon
  const iconXml = `<NuxtIcon name="${selectedIconName.value}" />`

  if (copyMode.value === 'icon-text') {
    copy(selectedIconName.value)
  } else {
    copy(iconXml)
  }
}

</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
    <!-- Header -->
    <div class="border-b border-gray-200 bg-white shadow-sm">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="mb-2 text-3xl font-bold text-gray-900">
            圖示預覽
          </h1>
          <p class="text-gray-600">
            點擊圖示即可複製到剪貼簿
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <!-- Control Panel -->
      <div class="mb-8 rounded-xl bg-white p-6 shadow-lg">
        <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <!-- Search Input -->
          <div class="max-w-md flex-1">
            <label
              for="search"
              class="mb-2 block text-sm font-medium text-gray-700"
            >
              搜尋圖示
            </label>
            <div class="relative">
              <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  class="size-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                id="search"
                v-model="searchText"
                type="text"
                placeholder="輸入關鍵字..."
                class="block w-full rounded-lg border border-gray-300 py-3 pl-10 pr-3 transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500"
              >
            </div>
          </div>

          <!-- Copy Mode -->
          <div class="flex flex-col">
            <label class="mb-3 block text-sm font-medium text-gray-700">
              複製模式
            </label>
            <div class="flex rounded-lg bg-gray-100 p-1">
              <label class="flex cursor-pointer items-center">
                <input
                  v-model="copyMode"
                  type="radio"
                  value="icon-text"
                  class="sr-only"
                >
                <span
                  class="rounded-md px-4 py-2 text-sm font-medium transition-colors"
                  :class="copyMode === 'icon-text' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
                >
                  圖示名稱
                </span>
              </label>
              <label class="flex cursor-pointer items-center">
                <input
                  v-model="copyMode"
                  type="radio"
                  value="xml"
                  class="sr-only"
                >
                <span
                  class="rounded-md px-4 py-2 text-sm font-medium transition-colors"
                  :class="copyMode === 'xml' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
                >
                  XML 標籤
                </span>
              </label>
            </div>
          </div>

          <!-- Copied Content Display -->
          <div
            v-if="text"
            class="flex flex-col"
          >
            <label class="mb-2 block text-sm font-medium text-gray-700">
              已複製內容
            </label>
            <div class="max-w-xs rounded-lg border border-green-200 bg-green-50 p-3">
              <div class="flex items-center">
                <svg
                  class="mr-2 size-4 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span class="truncate font-mono text-sm text-green-800">{{ text }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Results Count -->
        <div class="mt-4 border-t border-gray-200 pt-4">
          <p class="text-sm text-gray-600">
            顯示 <span class="font-semibold text-indigo-600">{{ filteredIconList.length }}</span> 個圖示
            <span v-if="searchText">（總共 {{ iconList.length }} 個）</span>
          </p>
        </div>
      </div>

      <!-- Icons Grid -->
      <div
        v-if="filteredIconList.length > 0"
        class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8"
      >
        <div
          v-for="(icon, index) in filteredIconList"
          :key="index"
          class="group cursor-pointer rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:border-indigo-300 hover:shadow-md"
          @click="copyIcon(iconName(icon))"
        >
          <div class="flex flex-col items-center space-y-3 p-4">
            <div class="flex size-12 items-center justify-center rounded-lg bg-gray-50 transition-colors group-hover:bg-indigo-50">
              <NuxtIcon
                :name="iconName(icon)"
                size="32"
                class="text-gray-600 transition-colors group-hover:text-indigo-600"
              />
            </div>
            <div class="w-full text-center">
              <p
                class="truncate px-1 text-xs font-medium text-gray-900"
                :title="icon"
              >
                {{ icon }}
              </p>
              <p class="mt-1 text-xs text-gray-500">
                點擊複製
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else
        class="py-16 text-center"
      >
        <div class="mx-auto size-24 text-gray-300">
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.441.935-5.983 2.453M12 3c4.97 0 9 4.03 9 9 0 1.386-.315 2.699-.875 3.873"
            />
          </svg>
        </div>
        <h3 class="mt-4 text-lg font-medium text-gray-900">
          找不到相符的圖示
        </h3>
        <p class="mt-2 text-gray-500">
          請嘗試其他關鍵字或清除搜尋條件
        </p>
        <button
          v-if="searchText"
          class="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-white transition-colors hover:bg-indigo-700"
          @click="searchText = ''"
        >
          清除搜尋
        </button>
      </div>
    </div>
  </div>
</template>
