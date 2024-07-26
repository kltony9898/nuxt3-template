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

onMounted(() => {
  watch(() => svg.value, () => {
    if (!svg.value) {
      return
    }
    const width = svg.value.$el.width.baseVal.value || 0
    const height = svg.value.$el.height.baseVal.value || 0
    svg.value.$el.setAttribute('viewBox', `0 0 ${width} ${height}`)
  }, {
    immediate: true
  })
})

</script>
<template>
  <component
    :is="iconComponent"
    ref="svg"
  />
</template>
