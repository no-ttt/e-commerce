<template>
  <div class="cart-page">
    <div class="cart-header">
      <h1>Your Shopping Cart</h1>
      <p v-if="cartItems.length > 0">{{ cartTotalQuantity }} items</p>
    </div>

    <div v-if="cartItems.length === 0" class="empty-state">
      <div class="icon">🛍️</div>
      <h2>Your cart is empty</h2>
      <p>Looks like you haven't added any items yet.</p>
      <router-link to="/" class="btn-primary">Browse Products</router-link>
    </div>

    <div v-else class="cart-content">
      <div class="cart-items">
        <div class="cart-item" v-for="item in cartItems" :key="item.product.id">
          <img :src="item.product.image" :alt="item.product.title" class="item-img">
          
          <div class="item-details">
            <h3 class="title">{{ item.product.title }}</h3>
            <p class="price">${{ item.product.price.toFixed(2) }}</p>
          </div>
          
          <div class="item-actions">
            <div class="qty-control">
              <button @click="updateQty(item, -1)" :disabled="item.quantity <= 1">-</button>
              <span class="qty">{{ item.quantity }}</span>
              <button @click="updateQty(item, 1)">+</button>
            </div>
            
            <p class="item-total">${{ (item.product.price * item.quantity).toFixed(2) }}</p>
            
            <button class="remove-btn" @click="removeItem(item.product.id)" title="Remove item">
              &times;
            </button>
          </div>
        </div>
      </div>
      
      <div class="cart-summary">
        <h2>Order Summary</h2>
        <div class="summary-row">
          <span>Subtotal</span>
          <span>${{ cartTotalPrice.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div class="summary-divider"></div>
        <div class="summary-row total">
          <span>Grand Total</span>
          <span>${{ cartTotalPrice.toFixed(2) }}</span>
        </div>
        <button class="btn-checkout">Proceed to Checkout</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Cart',
  computed: {
    ...mapGetters(['cartItems', 'cartTotalQuantity', 'cartTotalPrice'])
  },
  methods: {
    ...mapActions(['updateCartQuantity', 'removeFromCart']),
    updateQty(item, change) {
      const newQty = item.quantity + change
      if (newQty > 0) {
        this.updateCartQuantity({ productId: item.product.id, quantity: newQty })
      }
    },
    removeItem(productId) {
      if (confirm('Are you sure you want to remove this item?')) {
        this.removeFromCart(productId)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-page {
  max-width: 1200px;
  margin: 0 auto;
}

.cart-header {
  margin-bottom: 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 2px solid #edf2f7;
  padding-bottom: 1rem;
  
  h1 {
    font-size: 2rem;
    font-weight: 800;
    color: #2D3748;
  }
  
  p {
    color: #718096;
    font-weight: 500;
  }
}

.empty-state {
  text-align: center;
  padding: 5rem 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.02);
  
  .icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }
  
  h2 {
    font-size: 1.5rem;
    color: #2D3748;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #718096;
    margin-bottom: 2rem;
  }
}

.btn-primary {
  display: inline-block;
  background: #FF6B6B;
  color: white;
  text-decoration: none;
  font-weight: 600;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  transition: all 0.3s;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
  
  &:hover {
    background: #fa5252;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
  }
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 3rem;
  align-items: start;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cart-item {
  display: flex;
  align-items: center;
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
  gap: 1.5rem;
  
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
  
  .item-img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 12px;
  }
  
  .item-details {
    flex: 1;
    
    .title {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2D3748;
      margin-bottom: 0.5rem;
    }
    
    .price {
      font-weight: 700;
      color: #718096;
    }
  }
  
  .item-actions {
    display: flex;
    align-items: center;
    gap: 2rem;
    
    @media (max-width: 600px) {
      justify-content: space-between;
    }
    
    .qty-control {
      display: flex;
      align-items: center;
      background: #f4f6f8;
      border-radius: 50px;
      padding: 0.25rem;
      
      button {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: white;
        color: #4a5568;
        font-weight: 600;
        font-size: 1.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        transition: all 0.2s;
        
        &:hover:not(:disabled) {
          color: #FF6B6B;
          transform: scale(1.05);
        }
        
        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          box-shadow: none;
        }
      }
      
      .qty {
        min-width: 40px;
        text-align: center;
        font-weight: 600;
      }
    }
    
    .item-total {
      font-weight: 800;
      font-size: 1.25rem;
      color: #FF6B6B;
      min-width: 80px;
      text-align: right;
    }
    
    .remove-btn {
      font-size: 1.5rem;
      color: #a0aec0;
      transition: color 0.2s;
      
      &:hover {
        color: #e53e3e;
      }
    }
  }
}

.cart-summary {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  position: sticky;
  top: 100px;
  
  h2 {
    font-size: 1.25rem;
    color: #2D3748;
    margin-bottom: 1.5rem;
  }
  
  .summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    color: #4a5568;
    font-size: 1.05rem;
    
    &.total {
      font-size: 1.25rem;
      font-weight: 800;
      color: #2D3748;
      margin-top: 1rem;
      margin-bottom: 0;
    }
  }
  
  .summary-divider {
    height: 1px;
    background: #edf2f7;
    margin: 1.5rem 0;
  }
  
  .btn-checkout {
    width: 100%;
    margin-top: 2rem;
    background: #2D3748;
    color: white;
    font-weight: 700;
    padding: 1rem;
    border-radius: 12px;
    font-size: 1.1rem;
    transition: all 0.3s;
    
    &:hover {
      background: #1a202c;
      transform: translateY(-2px);
      box-shadow: 0 8px 15px rgba(0,0,0,0.1);
    }
  }
}
</style>
