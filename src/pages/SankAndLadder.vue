<template>
  <div class="md:flex md:flex-row h-screen">
    <SetupWizard v-if="currentPage === 'setup-wizard'" @players="setPlayers"/>
  </div>
</template>

<script>
import SetupWizard from '@/components/SetupWizad'
import {ref} from 'vue'

const players = ref([])
const currentPage = ref('setup-wizard')

function setPlayers(generatedPlayers) {
  players.value = generatedPlayers

  if (players.value.length > 1) {
    changeCurrentPage('choose-players_tern')
  }
}

function changeCurrentPage(toPage) {
  currentPage.value = toPage
}

export default {
  setup() {
    return {players, currentPage, setPlayers}
  },

  components: {
    SetupWizard
  },
}
</script>

<style>

</style>