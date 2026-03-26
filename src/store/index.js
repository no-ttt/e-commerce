import Vue from 'vue'
import Vuex from 'vuex'
import { api } from '../api/products'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    cart: []
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products
    },
    ADD_TO_CART(state, { product, quantity }) {
      const existingItem = state.cart.find(item => item.product.id === product.id)
      if (existingItem) {
        existingItem.quantity += Number(quantity)
      } else {
        state.cart.push({ product, quantity: Number(quantity) })
      }
    },
    UPDATE_CART_QUANTITY(state, { productId, quantity }) {
      const item = state.cart.find(item => item.product.id === productId)
      if (item) {
        item.quantity = Number(quantity)
      }
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(item => item.product.id !== productId)
    }
  },
  actions: {
    async fetchProducts({ commit }) {
      const response = await api.fetchProducts()
      if (response.status === 200) {
        commit('SET_PRODUCTS', response.data)
      }
    },
    addToCart({ commit }, payload) {
      commit('ADD_TO_CART', payload)
    },
    updateCartQuantity({ commit }, payload) {
      commit('UPDATE_CART_QUANTITY', payload)
    },
    removeFromCart({ commit }, productId) {
      commit('REMOVE_FROM_CART', productId)
    }
  },
  getters: {
    cartItems: state => state.cart,
    cartTotalQuantity: state => state.cart.reduce((total, item) => total + item.quantity, 0),
    cartTotalPrice: state => state.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  }
})
