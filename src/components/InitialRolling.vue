<template>
  <div class="w-full h-full p-[5%] bg-primary">
    <div class="h-full w-full flex flex-col">
      <div>
        <h1 class="text-green-secondary text-6xl font-play p-6 play-regular">Who will go first?</h1>
      </div>
      <div class="md:flex w-full h-full mt-6">
        <div class="w-full h-[400px] md:h-full md:w-2/6 md:order-2">
          <RollDice
              :player="currentPlayer"
              :score="score"
          >
            <template v-slot:rolling-button>
              <button v-if="isHuman && !isAutomaticallyRolling" class="bg-gray-800 rounded-md p-3 text-white" @click="() => manuallyRolling()">Roll</button>
            </template>
          </RollDice>
          <CountDown v-if="haveShowRemainingTime"/>
        </div>
        <div class="w-full md:w-4/6 mt-[25px] md:mx-4 md:mt-0 md:h-full md:bg-gray-primary space-y-2 rounded-md md:p-3">
          <h1 class="text-green-primary md:hidden">Players</h1>
          <PlayerRow v-for="player in playersWithOrder" :key="player.key" :player="player"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, defineProps, onBeforeMount, onMounted, ref} from 'vue'
import PlayerRow from '@/components/PlayerRow'
import RollDice from '@/components/RollDice'
import DiceRolling from '@/api/DiceRolling'
import Event from '@/utilities/event'
import CountDown from '@/components/CountDown'

const props = defineProps({
  players: {
    type: Array,
    default: () => []
  }
})

let score = ref(0)
let currentPlayer = ref(null)
let currentPlayerIndex = ref(0)
let showRemainingTime = ref(false)
let isAutomaticallyRolling = ref(true)
let timeout = ref(null)
let playingOrder = ref(null)

onBeforeMount(() => {
  Event.on('find-playing-order', () => findPlayingOrder())
  Event.on('automatically-rolling', () => automaticallyRolling())
  Event.on('get-playing-order', () => getPlayingOrder())
  Event.on('force-automatically-rolling', () => forceAutomaticallyRolling())
})

onMounted(() => {
  Event.emit('find-playing-order')
})

const findPlayingOrder = async () => {
  if (!hasRemainingPlayers()) return

  currentPlayer.value = props.players[currentPlayerIndex.value]

  if (currentPlayer.value.type === 'human') {
    isAutomaticallyRolling.value = false

    waitForRolling()
  } else {
    showRemainingTime.value = false
    isAutomaticallyRolling.value = true

    await automaticallyRolling()
  }

  currentPlayerIndex.value++
}

const hasRemainingPlayers = () => {
  return props.players.length >= (currentPlayerIndex.value + 1)
}

const waitForRolling = () => {
  timeout = setTimeout(function() {
    showRemainingTime.value = true
  }, 5000)
}

const automaticallyRolling = async () => {
  if (!isAutomaticallyRolling.value) return

  let playerScore = await DiceRolling.initialRolling(currentPlayer.value)

  if (playerScore) {
    score.value = playerScore.data.score

    startRolling()
  }
}

const manuallyRolling = async () => {
  isAutomaticallyRolling.value = false
  showRemainingTime.value = false
  clearTimeout(timeout)

  let playerScore = await DiceRolling.initialRolling(currentPlayer.value)

  if (playerScore) {
    score.value = playerScore.data.score

    startRolling()
  }
}

const forceAutomaticallyRolling = () => {
  isAutomaticallyRolling.value = true

  Event.emit('automatically-rolling')
}

const startRolling = () => {
  Event.emit(
      'start-rolling',
      {
        score: score.value,
        totalPlayers: props.players.length,
        currentPlayer: currentPlayerIndex.value
      }
  )
}

const getPlayingOrder = async () => {
  let orderReport = await DiceRolling.playingOrderReport()

  playingOrder.value = orderReport.data

  Event.emit('find-playing-order')
}

const isHuman = computed(() => {
  if (!currentPlayer.value) return false

  return currentPlayer.value.type === 'human'
})

const haveShowRemainingTime = computed(() => {
  return showRemainingTime.value
})

// eslint-disable-next-line vue/return-in-computed-property
const playersWithOrder = computed(() => {
  if (!playingOrder.value) {
    return props.players
  }

  let orderReport = props.players.map(function (player) {
    let playerOrder = playingOrder.value.filter((order) => order.player.key === player.key)

    return {
      key: playerOrder[0].player.key,
      name: playerOrder[0].player.name,
      position: playerOrder[0].position,
      score: playerOrder[0].score,
    }
  })

  return orderReport
})
</script>
