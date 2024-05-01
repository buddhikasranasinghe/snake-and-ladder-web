<template>
  <div class="md:flex md:flex-row h-screen">
    <div class="my-10 w-full md:w-2/5 flex">
      <p class="mx-auto md:my-auto text-teal-300 text-6xl md:text-9xl font-bold">Snake & <br/>Ladder</p>
    </div>
    <div class="w-full md:w-3/5 md:flex">
      <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow mx-auto my-auto w-2/3">
        <span class="text-4xl font-bold">Let's Play</span>
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
          <button class="mt-5 bg-green-400 rounded-md p-3 w-full text-white font-bold text-xl" :disabled="isInvalid"
                  @click="playGame">
            Play
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numberOfPlayers: 2,
      isInvalid: false,
      errorMessage: 'At least one player should have to select'
    }
  },

  watch: {
    numberOfPlayers() {
      this.isInvalid = this.numberOfPlayers <= 0
    }
  },

  methods: {
    playGame() {
      
    }
  }
}
</script>

<style>

</style>