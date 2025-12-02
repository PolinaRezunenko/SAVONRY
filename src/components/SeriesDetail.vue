<template>
  <section>
    <div class="container">
      <Breadcrumbs />
      <div class="series-detail" v-if="series">
        <div class="series-header">
          <div class="series-info">
            <h1>{{ series.name }}</h1>
            <p class="series-description">{{ series.description }}</p>
          </div>
        </div>

        <div class="series-products">
          <div class="products-header">
            <h2>Товары серии</h2>
          </div>
          <div class="products-grid">
            <div 
              v-for="product in seriesProducts" 
              :key="product.id" 
              class="product-card"
            >
              <RouterLink 
                :to="{ name: 'ProductDetail', params: { id: product.id } }"
                class="product-link"
              >
                <div class="product-image">
                  <img 
                    :src="product.image_url || '/images/placeholder.jpg'" 
                    :alt="product.name"
                    @error="handleProductImageError"
                  >
                  <div v-if="product.is_new" class="badge new">NEW</div>
                  <div v-if="product.is_promotion" class="badge sale">SALE</div>
                </div>
                <p class="product-name">{{ product.name }}</p>
              </RouterLink>
              <div class="product-bottom">
                <div class="price-section">
                  <div class="current-price">{{ product.price }} ₽</div>
                  <div v-if="product.old_price" class="old-price">{{ product.old_price }} ₽</div>
                </div>
                <button 
                  class="add-to-cart-btn"
                  @click="addToCart(product)"
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
                    В корзину
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { useCart } from '@/composables/useCart'
import { supabase } from '@/lib/supabase'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Breadcrumbs from './Breadcrumbs.vue'

export default {
  name: 'SeriesDetail',
  components: {
    Breadcrumbs
  },
  setup() {
    const series = ref(null)
    const seriesProducts = ref([])
    const route = useRoute()
    const { 
      handleAddToCart, 
      getProductQuantity, 
      isProductLoading,
      loadCartItems 
    } = useCart()

    const loadSeries = async () => {
      try {
        const { data, error } = await supabase
          .from('series')
          .select('*')
          .eq('id', route.params.id)
          .single()

        if (error) throw error
        series.value = data
      } catch (error) {
        console.error('Ошибка загрузки серии:', error)
      }
    }

    const loadSeriesProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('series_id', route.params.id)
          .order('created_at', { ascending: false })

        if (error) throw error
        seriesProducts.value = data || []
      } catch (error) {
        console.error('Ошибка загрузки товаров серии:', error)
      }
    }

    const addToCart = async (product) => {
      await handleAddToCart(product)
    }

    const handleImageError = (event) => {
      event.target.src = '@/assets/images/series-placeholder.jpg'
    }

    const handleProductImageError = (event) => {
      event.target.src = '@/assets/images/placeholder.jpg'
    }

    onMounted(async () => {
      await loadSeries()
      await loadSeriesProducts()
      await loadCartItems()
    })

    return {
      series,
      seriesProducts,
      addToCart,
      handleImageError,
      handleProductImageError,
      getProductQuantity,
      isProductLoading
    }
  }
}
</script>

<!-- SeriesDetail.vue - исправленные стили для 4 товаров в ряд -->
<style scoped>
.series-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.series-header {
  text-align: center;
  margin-bottom: 80px;
  padding: 0 20px;
}

.series-info h1 {
  font-family: "Raleway-SemiBold";
  font-weight: 600;
  font-size: 48px;
  color: #000;
  margin-bottom: 24px;
}

.series-description {
  font-family: "Mulish-Light-300";
  font-weight: 300;
  font-size: 18px;
  color: #666;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
}

.series-products {
  max-width: 1200px;
  margin: 0 auto;
}

.products-header {
  margin-bottom: 40px;
  padding: 0 20px;
}

.products-header h2 {
  font-family: "Raleway-SemiBold";
  font-weight: 600;
  font-size: 28px;
  color: #000;
  margin: 0;
  text-align: left;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 товара в ряд */
  gap: 40px;
  width: 100%;
  margin: 0 auto;
}

.product-card {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
}

.product-link {
  text-decoration: none;
  color: inherit;
  display: block;
  margin-bottom: 15px;
}

.product-image {
  height: 270px;
  margin-bottom: 16px;
  position: relative;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.badge {
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  font-family: "Mulish-Regular-400";
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge.new {
  background: #000;
}

.badge.sale {
  background: #ff4444;
}

.product-name {
  color: #000000;
  margin-bottom: 10px;
  font-family: "Mulish-Regular-400";
  font-weight: 300;
  font-style: Light;
  font-size: 16px;
  line-height: 150%;
  text-align: left;
  min-height: 48px;
  display: flex;
  align-items: flex-start;
}

.product-bottom {
  display: flex;
  width: 100%;
  height: 44px;
  align-items: center;
  justify-content: space-between;
  gap: 0;
}

.price-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  flex-shrink: 0;
}

.current-price {
  color: #000000;
  font-size: 24px;
  height: 20px;
  display: flex;
  align-items: center;
  font-family: "Mulish-Regular-400";
  font-weight: 600;
  line-height: 1;
}

.old-price {
  text-decoration: line-through;
  color: #999;
  font-size: 14px;
  font-family: "Mulish-Light-300";
  line-height: 1;
  margin-top: 2px;
}

.add-to-cart-btn {
  width: 142px;
  height: 44px;
  background-color: transparent;
  border: 1px solid #000000;
  color: #000000;
  font-family: "Mulish-Light-300";
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 10px;
  border-radius: 5px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-to-cart-btn:hover:not(:disabled) {
  background-color: #000000;
  color: #F4F6F5;
}

.add-to-cart-btn.in-cart {
  background-color: #000000;
  color: #F4F6F5;
}

.add-to-cart-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Адаптивность для SeriesDetail */
@media (max-width: 1200px) {
  .products-grid {
    gap: 30px;
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 товара в ряд на планшетах */
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .series-header {
    margin-bottom: 60px;
  }
  
  .series-info h1 {
    font-size: 36px;
  }
  
  .products-header h2 {
    text-align: center;
  }
  
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  .product-bottom {
    flex-direction: column;
    height: auto;
    gap: 10px;
    align-items: stretch;
  }
  
  .add-to-cart-btn {
    width: 100%;
  }
  
  .price-section {
    align-items: center;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr; /* 1 товар в ряд на мобильных */
  }
  
  .series-info h1 {
    font-size: 28px;
  }
  
  .series-description {
    font-size: 16px;
  }
}
</style>