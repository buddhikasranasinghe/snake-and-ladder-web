import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage'
import GameBoard from '@/pages/GameBoard'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/game-board',
    name: 'gameBoard',
    component: GameBoard
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
