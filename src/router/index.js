import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
