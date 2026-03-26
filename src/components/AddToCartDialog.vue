<template>
  <div class="dialog-overlay" v-if="isOpen" @click.self="close">
    <div class="dialog-content">
      <button class="close-btn" @click="close">&times;</button>
      
      <div v-if="product" class="product-info">
        <img :src="product.image" :alt="product.title" class="product-img">
        <div class="details">
          <h3>{{ product.title }}</h3>
          <p class="price">${{ product.price.toFixed(2) }}</p>
        </div>
      </div>

      <div class="form-group">
        <label for="quantity">Quantity <span class="required">*</span></label>
        <input 
          type="number" 
          id="quantity" 
          v-model.number="quantity" 
          min="1" 
          class="qty-input"
          @keyup.enter="confirm"
          ref="qtyInput"
        >
        <p class="error" v-if="error">{{ error }}</p>
      </div>

      <div class="actions">
        <button class="btn-cancel" @click="close">Cancel</button>
        <button class="btn-confirm" @click="confirm" :disabled="!isValid">Add to Cart</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddToCartDialog',
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    product: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      quantity: 1,
      error: ''
    }
  },
  computed: {
    isValid() {
      return this.quantity > 0 && Number.isInteger(this.quantity)
    }
  },
  watch: {
    isOpen(newVal) {
      if (newVal) {
        this.quantity = 1
        this.error = ''
        // Focus input on open
        this.$nextTick(() => {
          if (this.$refs.qtyInput) {
            this.$refs.qtyInput.focus()
          }
        })
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    confirm() {
      if (!this.isValid) {
        this.error = 'Please enter a valid quantity (minimum 1).'
        return
      }
      this.error = ''
      this.$emit('confirm', {
        product: this.product,
        quantity: this.quantity
      })
      this.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog-content {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  width: 90%;
  max-width: 450px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  position: relative;
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1.5rem;
  font-size: 2rem;
  color: #a0aec0;
  transition: color 0.2s;
  
  &:hover {
    color: #4a5568;
  }
}

.product-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  margin-top: 1rem;
  
  .product-img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  }
  
  .details {
    h3 {
      font-size: 1.1rem;
      color: #2d3748;
      margin-bottom: 0.5rem;
      line-height: 1.4;
    }
    
    .price {
      font-weight: 700;
      color: #FF6B6B;
      font-size: 1.25rem;
    }
  }
}

.form-group {
  margin-bottom: 2rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #4a5568;
    
    .required {
      color: #e53e3e;
    }
  }
  
  .qty-input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    font-size: 1.1rem;
    outline: none;
    transition: border-color 0.2s;
    font-family: inherit;
    
    &:focus {
      border-color: #FF6B6B;
    }
  }
  
  .error {
    color: #e53e3e;
    font-size: 0.85rem;
    margin-top: 0.5rem;
  }
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  
  button {
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.2s;
  }
  
  .btn-cancel {
    color: #4a5568;
    background: #edf2f7;
    
    &:hover {
      background: #e2e8f0;
    }
  }
  
  .btn-confirm {
    background: #FF6B6B;
    color: white;
    
    &:hover:not(:disabled) {
      background: #fa5252;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
</style>
