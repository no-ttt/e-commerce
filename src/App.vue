<template>
  <div id="app">
    <nav class="navbar">
      <div class="logo">
        <router-link to="/" class="logo-link">MiniStore</router-link>
      </div>

      <!-- switch btn-->
      <div class="links">
        <router-link to="/">Products</router-link>
        <router-link to="/cart" class="cart-link">
          <span class="cart-icon">🛒</span> Cart 
          <span class="badge" v-if="cartTotalQuantity > 0">{{ cartTotalQuantity }}</span>
        </router-link>
      </div>
    </nav>
    <main class="main-content">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters(['cartTotalQuantity'])
  }
}
</script>

<style lang="scss">
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 5%;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  .logo-link {
    font-size: 1.75rem;
    font-weight: 800;
    letter-spacing: -0.5px;
    text-decoration: none;
    background: linear-gradient(135deg, #FF6B6B 0%, #556270 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .links {
    display: flex;
    align-items: center;
    gap: 2rem;

    a {
      color: #556270;
      text-decoration: none;
      font-weight: 600;
      font-size: 1.05rem;
      transition: color 0.3s ease;
      display: flex;
      align-items: center;

      &:hover, &.router-link-exact-active {
        color: #FF6B6B;
      }
    }
    
    .cart-link {
      position: relative;
      background: #f4f6f8;
      padding: 0.5rem 1rem;
      border-radius: 50px;
      transition: all 0.3s ease;
      
      .cart-icon {
        margin-right: 0.5rem;
      }
      
      &:hover {
        background: #FF6B6B;
        color: white;
      }
      &.router-link-exact-active {
        background: #FF6B6B;
        color: white;
      }
    }
  }

  .badge {
    background: #FF6B6B;
    color: white;
    font-size: 0.75rem;
    font-weight: bold;
    padding: 0.15rem 0.5rem;
    border-radius: 12px;
    margin-left: 0.5rem;
    box-shadow: 0 2px 5px rgba(255, 107, 107, 0.4);
  }
}

.main-content {
  padding: 3rem 5%;
  max-width: 1400px;
  margin: 0 auto;
}
</style>
