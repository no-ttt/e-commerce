import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ProductList',
    component: () => import('../views/ProductList.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
