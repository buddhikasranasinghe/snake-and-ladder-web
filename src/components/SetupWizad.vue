<template>
  <div class="md:flex md:flex-row h-screen w-full">
    <div class="my-10 w-full md:w-2/5 flex">
      <p class="mx-auto md:my-auto text-teal-300 text-6xl md:text-9xl font-bold font-play">Snake & <br/>Ladder</p>
    </div>
    <div class="w-full md:w-3/5 md:flex">
      <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow mx-auto my-auto w-2/3">
        <span class="text-4xl font-bold font-play">Let's Play</span>
        <div class="mt-6 md:flex md:justify-between">
          <label for="counter-input" class="block mb-1 text-sm text-xl text-gray-900">Number of players</label>
          <div class="relative flex items-center ">
            <button type="button" id="decrement-button" data-input-counter-decrement="counter-input"
                    class="flex-shrink-0 bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                    @click="numberOfPlayers--">
              <svg class="w-2.5 h-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 18 2">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M1 1h16"/>
              </svg>
            </button>
            <input type="text" id="counter-input" data-input-counter
                   class="flex-shrink-0 text-gray-900 border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                   placeholder="" v-model="numberOfPlayers"/>
            <button type="button" id="increment-button" data-input-counter-increment="counter-input"
                    class="flex-shrink-0 bg-gray-100 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                    @click="numberOfPlayers++">
              <svg class="w-2.5 h-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                   viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 1v16M1 9h16"/>
              </svg>
            </button>
          </div>
        </div>
        <span class="text-red-400 text-left" v-if="isInvalid">{{ errorMessage }}</span>
        <div class="mt-5 justify-center content-center flex">
          <button class="mt-5 bg-green-400 rounded-md p-3 w-full text-white font-bold text-xl" :disabled="isInvalid || isLoading"
                  @click="playGame">
            <div class="justify-center">
              <div v-if="isLoading">
                <svg aria-hidden="true" class="inline w-6 h-6 text-gray-200 animate-spin fill-green-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
              <div v-else>
                Play
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SetupWizard from '@/api/SetupWizard'
import {ref, watch, defineEmits} from 'vue'
import Alert from '@/utilities/Alert'

const emit = defineEmits(['players'])

const numberOfPlayers = ref(2)
const isInvalid = ref(false)
const errorMessage = ref('At least one player should have to select')
const isLoading = ref(false)

async function playGame() {
  try {
    isLoading.value = true

    const { data } = await SetupWizard.makePlayers({number_of_players: numberOfPlayers.value})

    isLoading.value = false

    emit('players', data.players)
  } catch (e) {
    Alert.error('Can\'t process players')
  }
}

watch(numberOfPlayers, () => {
    isInvalid.value = numberOfPlayers.value <= 0
})
</script>
