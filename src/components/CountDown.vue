<template>
  <h1>{{ remainingSeconds }}</h1>
</template>

<script setup>
import {onMounted, onUnmounted, ref} from 'vue'
import Event from '@/utilities/event'

const remainingSeconds = ref(5);
let interval = null;

onMounted(() => {
  if (remainingSeconds.value > 0) {
    interval = setInterval(() => {
      remainingSeconds.value--

      if (remainingSeconds.value <= 0) {
        clearInterval(interval)

        Event.emit('force-automatically-rolling')
      }
    }, 1000)
  }
});

onUnmounted(() => clearInterval(interval))
</script>


<style scoped>

</style>