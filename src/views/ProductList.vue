<template>
  <div class="product-list-page">
    <header class="page-header">
      <h1>Featured Products</h1>
      <p>Discover our premium selection of tech gear and accessories.</p>
    </header>

    <div class="loading-state" v-if="isLoading">
      <div class="spinner"></div>
      <p>Loading products...</p>
    </div>

    <div class="product-grid" v-else>
      <div 
        class="product-card" 
        v-for="product in products" 
        :key="product.id"
      >
        <div class="image-wrapper">
          <img :src="product.image" :alt="product.title" class="product-img">
          <div class="overlay">
            <button class="add-btn" @click="openDialog(product)">
              Add to Cart
            </button>
          </div>
        </div>
        <div class="product-info">
          <h3 class="title">{{ product.title }}</h3>
          <p class="price">${{ product.price.toFixed(2) }}</p>
        </div>
      </div>
    </div>

    <AddToCartDialog 
      :is-open="isDialogOpen"
      :product="selectedProduct"
      @close="isDialogOpen = false"
      @confirm="handleAddToCart"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AddToCartDialog from '@/components/AddToCartDialog.vue'

export default {
  name: 'ProductList',
  components: {
    AddToCartDialog
  },
  data() {
    return {
      isDialogOpen: false,
      selectedProduct: null,
      isLoading: true
    }
  },
  computed: {
    ...mapState(['products'])
  },
  async created() {
    try {
      await this.fetchProducts()
    } finally {
      this.isLoading = false
    }
  },
  methods: {
    ...mapActions(['addToCart', 'fetchProducts']),
    openDialog(product) {
      this.selectedProduct = product
      this.isDialogOpen = true
    },
    handleAddToCart({ product, quantity }) {
      this.addToCart({ product, quantity })
    }
  }
}
</script>

<style lang="scss" scoped>
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  color: #718096;
  font-weight: 500;
  
  .spinner {
    width: 45px;
    height: 45px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #FF6B6B;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.page-header {
  margin-bottom: 3rem;
  text-align: center;
  
  h1 {
    font-size: 2.5rem;
    font-weight: 800;
    color: #2D3748;
    margin-bottom: 0.5rem;
  }
  
  p {
    font-size: 1.1rem;
    color: #718096;
  }
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2.5rem;
}

.product-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0,0,0,0.1);
    
    .image-wrapper .overlay {
      opacity: 1;
    }
  }
}

.image-wrapper {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
  
  .product-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  .overlay {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    backdrop-filter: blur(2px);
  }
  
  .add-btn {
    background: white;
    color: #1a1a1a;
    font-weight: 700;
    padding: 0.8rem 1.5rem;
    border-radius: 50px;
    font-size: 1rem;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    transform: translateY(10px);
    transition: all 0.3s ease;
    
    &:hover {
      background: #FF6B6B;
      color: white;
      transform: translateY(0);
    }
  }
}

.product-card:hover .image-wrapper .product-img {
  transform: scale(1.05);
}
.product-card:hover .image-wrapper .add-btn {
  transform: translateY(0);
}

.product-info {
  padding: 1.5rem;
  
  .title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #2D3748;
    margin-bottom: 0.5rem;
    line-height: 1.4;
  }
  
  .price {
    font-size: 1.25rem;
    font-weight: 800;
    color: #FF6B6B;
  }
}
</style>
