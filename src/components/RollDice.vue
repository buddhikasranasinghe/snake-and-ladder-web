<template>
  <div class="bg-gray-primary w-full rounded-md h-full">
    <div class="p-3">
      <h3 class="text-green-secondary text-2xl text-center">{{ turn }}</h3>
    </div>

    <div class="h-4/5">
      <RollingDice :score="props.score"/>
    </div>

    <div class="p-3 justify-center flex">
      <slot name="rolling-button"></slot>
    </div>
  </div>
</template>

<script setup>
import {defineProps, computed} from 'vue'
import RollingDice from '@/components/RollingDice'

const props = defineProps(['player', 'score'])


const turn = computed(() => {
  if (!props.player) return 'Rolling soon..'

  const name = props.player.type === 'human' ? `${props.player.name}r` : props.player.name

  return `${name}'s turn`
})
</script>

<style scoped>

</style>