<script setup lang="ts">
const icons = await import.meta.glob('@/assets/icons/**/*.svg') as Record<string, () => Promise<Component>>
const iconList = Object.keys(icons).map(key => key.split('/assets/icons/')[1].split('.svg')[0])
</script>

<template>
  <div>
    <BaseIcon
      v-for="icon of iconList"
      :key="icon"
      :name="icon"
      class="m-4 size-12 stroke-black hover:stroke-black/50"
    />
  </div>
</template>
