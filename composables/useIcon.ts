type Icons = Record<string, () => Promise<Component>>

const icons = ref<Icons>()
icons.value = import.meta.glob('@/assets/icons/**/*.svg') as Record<string, () => Promise<Component>>

export const useIcon = (name: string) => {
  const path = `/assets/icons/${name}.svg`

  const getIcon = icons.value?.[path]

  if (!getIcon) {
    return
  }

  return defineAsyncComponent(() => getIcon())
}
