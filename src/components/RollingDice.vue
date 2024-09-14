<template>
  <div class="h-full justify-center p-3">
    <div class="justify-center flex w-full h-full bg-gray-200 shadow-lg rounded-md align-middle">
      <div class="dice m-auto" id="dice">
        <div class="face front"></div>
        <div class="face back"></div>
        <div class="face top"></div>
        <div class="face bottom"></div>
        <div class="face right"></div>
        <div class="face left"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onBeforeMount} from 'vue'
import Dice from '@/utilities/Dice'
import Event from '@/utilities/event'

onBeforeMount(() => {
  Event.on('start-rolling', (payload) => rollDice(payload))
})

async function rollDice(payload) {
  let dice = new Dice()
  let rollingPath = dice.getRandomRollingPath(payload.score)
  let diceElement = document.getElementById('dice')

  for (let path of rollingPath) {
    diceElement.style.transform = path.transformation
    await sleep(500)
  }

  await sleep(1000)
  if (payload.totalPlayers >= (payload.currentPlayer + 1)) {
    Event.emit('get-playing-order')
  }

  let resetPath = dice.reset()
  diceElement.style.transform = resetPath.transformation
}

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}
</script>

<style scoped>
  .dice {
    position: relative;
    width: 100px;
    height: 100px;
    transform-style: preserve-3d;
    transition: 1s ease;
  }
  @keyframes rolling {
    50% {
      transform: rotateX(455deg) rotateY(455deg);
    }
  }
  .face {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 5px solid #f6f3f0;
    border-radius: 20px;
    background: linear-gradient(145deg, #dddbd8, #fff);
    transform-style: preserve-3d;
  }
  .face::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background: #f6f3f0;
    transform: translateZ(-1px);
  }
  .face::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #000;
  }
  .front {
    transform: translateZ(50px);
  }
  .back {
    transform: rotateX(180deg) translateZ(50px);
  }
  .top {
    transform: rotateX(90deg) translateZ(50px);
  }
  .bottom {
    transform: rotateX(-90deg) translateZ(50px);
  }
  .right {
    transform: rotateY(90deg) translateZ(50px);
  }
  .left {
    transform: rotateY(-90deg) translateZ(50px);
  }
  .front::after {
    width: 30px;
    height: 30px;
    background: #0ff;
    margin: -15px 0 0 -15px;
  }
  .back::after {
    margin: -35px 0 0 -30px;
    box-shadow: 40px 0, 0 25px, 40px 25px, 0 50px, 40px 50px;
  }
  .top::after {
    margin: -30px 0 0 -30px;
    box-shadow: 40px 40px;
  }
  .bottom::after {
    margin: -36px 0 0 -36px;
    box-shadow: 26px 26px, 52px 52px, 52px 0, 0 52px;
  }
  .right::after {
    margin: -30px 0 0 -30px;
    box-shadow: 40px 0, 0 40px, 40px 40px;
  }
  .left::after {
    margin: -35px 0 0 -35px;
    box-shadow: 25px 25px, 50px 50px;
  }
</style>