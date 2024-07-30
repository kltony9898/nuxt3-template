<script setup lang="ts">
interface Props {
  name: string
}

const props = defineProps<Props>()

const iconComponent = shallowRef()

watch(() => props.name, () => {
  const icon = useIcon(props.name)
  iconComponent.value = icon
}, {
  immediate: true
})

const svg = ref()

</script>
<template>
  <div class="relative">
    <component
      :is="iconComponent"
      ref="svg"
      class="size-full"
    />
  </div>
</template>
