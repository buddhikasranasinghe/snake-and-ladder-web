import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/SnakeAndLadder.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      title: 'Snake & Ladder | Home',
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
