<template>
  <div class="bg-gray-secondary w-full p-3 rounded-lg flex justify-between shadow-lg">
    <span class="text-white text-xl my-auto">{{ props.player.name }}</span>
    <span class="bg-green-secondary h-10 w-10 rounded-full text-center py-2 shadow-lg font-bold">{{ props.player.position }}</span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps(['player'])

</script>

<style scoped>

</style>