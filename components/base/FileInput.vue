<script setup lang="ts">
interface Props {
  type: 'image' | 'video',
  defaultImage?: string
}

const props = withDefaults(defineProps<Props>(), {
  defaultImage: ''
})

const model = defineModel<File>()
const acceptMap = {
  image: 'image/*',
  video: 'video/*'
}

const iconMap = {
  image: 'form:image-upload',
  video: 'form:video-upload'
}

const textMap = {
  image: '上傳圖片',
  video: '上傳影片'
}

const { files, open, onChange } = useFileDialog({
  accept: acceptMap[props.type]
})

const previewImage = ref(props.defaultImage)

const updateFile = () => open()

onChange(async () => {
  if (!files.value) {
    return
  }

  model.value = files.value[0]

  switch (props.type) {
    case 'image': {
      previewImage.value = URL.createObjectURL(files.value[0])
      break
    }
    case 'video': {
      const videoURL = await useVideoFrame(URL.createObjectURL(files.value[0]), 1)
      previewImage.value = videoURL
      break
    }
  }
})

watch(model, async () => {
  if (!model.value) {
    return
  }

  const fileURL = URL.createObjectURL(model.value)

  switch (props.type) {
    case 'image': {
      previewImage.value = fileURL

      break
    }
    case 'video': {
      const videoURL = await useVideoFrame(fileURL, 1)
      previewImage.value = videoURL
      break
    }
  }
}, {
  immediate: true
})

</script>

<template>
  <div class="group size-24 overflow-hidden rounded-xl border-2 border-black bg-white">
    <button
      v-if="!previewImage"
      class="flex size-full flex-col items-center justify-center gap-1 text-sm"
      @click="updateFile"
    >
      <NuxtIcon
        :name="iconMap[props.type]"
        size="24"
        class="text-black"
      />
      {{ textMap[props.type] }}
    </button>
    <div
      v-else
      class="size-full bg-cover bg-center"
      :style="`background-image: url(${previewImage});`"
    >
      <div class="hidden size-full items-center justify-center bg-black/50 group-hover:flex">
        <button @click="updateFile">
          <NuxtIcon
            name="form:edit"
            size="24"
            class="text-black"
          />
        </button>
      </div>
    </div>
  </div>
</template>
