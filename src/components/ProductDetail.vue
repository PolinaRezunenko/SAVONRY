<template>
  <section>
    <div class="container">
      <Breadcrumbs />
      <div class="product-detail" v-if="product">
        <div class="product-images">
          <img 
            :src="product.image_url || '/images/placeholder.jpg'" 
            :alt="product.name" 
            class="main-image"
            @error="handleImageError"
          >
        </div>
        <div class="product-info">
          <h1>{{ product.name }}</h1>
          <p class="product-price">{{ product.price }} ₽</p>
          <p class="product-description">{{ product.description || 'Описание товара' }}</p>
          <button 
            class="add-to-cart-btn" 
            @click="addToCart"
            :disabled="isProductLoading(product.id)"
            :class="{ 'in-cart': getProductQuantity(product.id) > 0 }"
          >
            <span v-if="isProductLoading(product.id)">
              Добавляем...
            </span>
            <span v-else-if="getProductQuantity(product.id) > 0">
              В корзине • {{ getProductQuantity(product.id) }}
            </span>
            <span v-else>
              Добавить в корзину
            </span>
          </button>
        </div>
      </div>
      <div v-else-if="!loading">
        <p>Товар не найден</p>
      </div>
      <div v-else>
        <p>Загрузка...</p>
      </div>
    </div>
  </section>
<!-- Добавляем секцию хитов -->
  <ProductHits />
</template>

<script>
import { useCart } from '@/composables/useCart'
import { supabase } from '@/lib/supabase'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Breadcrumbs from './Breadcrumbs.vue'
import ProductHits from '@/components/ProductHits.vue' // Добавляем импорт

export default {
  name: 'ProductDetail',
  components: {
    Breadcrumbs,
    ProductHits // Регистрируем компонент
  },
  setup() {
    const product = ref(null)
    const loading = ref(false)
    const route = useRoute()
    const { 
      handleAddToCart, 
      getProductQuantity, 
      isProductLoading,
      loadCartItems 
    } = useCart()

    const loadProduct = async () => {
      try {
        loading.value = true
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', route.params.id)
          .single()

        if (error) throw error
        product.value = data
      } catch (error) {
        console.error('Ошибка загрузки товара:', error)
        product.value = null
      } finally {
        loading.value = false
      }
    }

    const addToCart = async () => {
      if (product.value) {
        await handleAddToCart(product.value)
      }
    }

    const handleImageError = (event) => {
      event.target.src = '@/assets/images/placeholder.jpg'
    }

    onMounted(async () => {
      await loadProduct()
      await loadCartItems() // Загружаем корзину при старте
    })

    return {
      product,
      loading,
      addToCart,
      handleImageError,
      getProductQuantity,
      isProductLoading
    }
  }
}
</script>

<style scoped>
.add-to-cart-btn.in-cart {
  background-color: #000000;
}

.add-to-cart-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.product-detail {
  display: flex;
  gap: 60px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.product-images {
  flex: 1;
}

.main-image {
  width: 100%;
  max-width: 500px;
  border-radius: 10px;
  object-fit: cover;
}

.product-info {
  flex: 1;
}

.product-info h1 {
  font-size: 32px;
  margin-bottom: 20px;
  color: #000;
}

.product-price {
  font-size: 32px;
  font-weight: bold;
  color: #000;
  margin: 20px 0;
}

.product-description {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 30px;
  color: #666;
}

.add-to-cart-btn {
  background-color: #000;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  min-width: 200px;
}

.add-to-cart-btn:hover:not(:disabled) {
  background-color: #333;
}

.add-to-cart-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>