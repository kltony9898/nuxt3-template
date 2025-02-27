<script setup lang="ts">
const createExample = async (id: string, data: {
  name: string,
  number: number
}) => {
  try {
    const response = await useApi().example.createExample(id, data)
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

const readExample = async (id: string, type: 'default') => {
  try {
    const response = await useApi().example.readExample(id, type)
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

const updateExample = async (id: string, data: Partial<{
  name: string,
  number: number
}>) => {
  try {
    const response = await useApi().example.updateExample(id, data)
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

const deleteExample = async (id: string) => {
  try {
    const response = await useApi().example.deleteExample(id)
    console.log(response)
  } catch (error) {
    console.log(error)
  }
}

</script>

<template>
  <div class="flex items-center justify-center gap-4 p-12">
    <button
      class="border border-black px-4 py-2"
      @click="readExample('1ab23cd4', 'default')"
    >
      READ
    </button>
    <button
      class="border border-black px-4 py-2"
      @click="createExample('1ab23cd4', {
        name: 'Pey',
        number: 30
      })"
    >
      CREATE
    </button>
    <button
      class="border border-black px-4 py-2"
      @click="updateExample('1ab23cd4', {
        number: 14
      })"
    >
      UPDATE
    </button>
    <button
      class="border border-black px-4 py-2"
      @click="deleteExample('1ab23cd4')"
    >
      DELETE
    </button>
  </div>
</template>
