import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import CreateUser from '../views/Create.vue'
import DashBoard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/create',
    name: 'CreateUser',
    component: CreateUser
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashBoard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
