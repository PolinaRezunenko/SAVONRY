<template>
  <section>
    <div class="container">
      <Breadcrumbs />
      <div class="hits-page">
        <h1>Хиты продаж</h1>
        
        <div v-if="loading" class="loading">
          <p>Загрузка хитов...</p>
        </div>

        <div v-else-if="hitProducts.length === 0" class="empty-products">
          <p>Хитов продаж пока нет</p>
          <RouterLink to="/" class="continue-shopping">Вернуться на главную</RouterLink>
        </div>

        <div v-else class="hits-content">
          <div class="hits-grid">
            <div 
              v-for="product in hitProducts" 
              :key="product.id" 
              class="hits-card"
            >
              <RouterLink 
                :to="{ name: 'ProductDetail', params: { id: product.id } }"
                class="hits-card-link"
              >
                <div class="hits-card-top">
                  <img 
                    :src="product.image_url || '/images/placeholder.jpg'" 
                    :alt="product.name" 
                    class="hits-card-image"
                    @error="handleImageError"
                  >
                  <div class="hits-badge">ХИТ</div>
                  <div v-if="product.is_new" class="new-badge">NEW</div>
                </div>
                <p class="hits-card-name">{{ product.name }}</p>
              </RouterLink>
              <div class="hits-card-bot">
                <div class="hits-price-section">
                  <div class="hits-card-price">{{ product.price }} ₽</div>
                  <div v-if="product.old_price" class="hits-old-price">{{ product.old_price }} ₽</div>
                </div>
                <button 
                  class="hits-card-button"
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
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import ProductHits from '@/components/ProductHits.vue'

export default {
  name: 'HitsPage',
  components: {
    Breadcrumbs,
    ProductHits
  },
  setup() {
    const hitProducts = ref([])
    const loading = ref(true)
    const { 
      handleAddToCart, 
      getProductQuantity, 
      isProductLoading,
      loadCartItems 
    } = useCart()

    // Загрузка всех хитов из БД - используем is_popular вместо is_hit
    const loadHitProducts = async () => {
      try {
        loading.value = true
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_popular', true)
          .eq('is_active', true)
          .order('created_at', { ascending: false })

        if (error) throw error
        hitProducts.value = data || []
        
        console.log('Найдено хитов:', hitProducts.value.length)
        console.log('Хиты:', hitProducts.value)
      } catch (error) {
        console.error('Ошибка загрузки хитов:', error)
        hitProducts.value = []
      } finally {
        loading.value = false
      }
    }

    const addToCart = async (product) => {
      await handleAddToCart(product)
    }

    const handleImageError = (event) => {
      event.target.src = '/images/placeholder.jpg'
    }

    onMounted(async () => {
      await loadHitProducts()
      await loadCartItems()
    })

    return {
      hitProducts,
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
.hits-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.hits-page h1 {
  font-family: "Raleway-SemiBold";
  font-weight: 600;
  font-size: 48px;
  color: #000;
  text-align: center;
  margin-bottom: 64px;
}

.loading, .empty-products {
  text-align: center;
  padding: 60px 0;
}

.loading p, .empty-products p {
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
}

.continue-shopping {
  color: #000;
  text-decoration: none;
  font-weight: bold;
  padding: 10px 20px;
  border: 2px solid #000;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.continue-shopping:hover {
  background-color: #000;
  color: white;
}

.hits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 40px;
  justify-items: center;
}

.hits-card {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  width: 270px;
  position: relative;
  transition: transform 0.3s ease;
}

.hits-card:hover {
  transform: translateY(-5px);
}

.hits-card-top {
  height: 350px;
  margin-bottom: 18px;
  position: relative;
}

.hits-card-image {
  width: 100%;
  height: 286px;
  object-fit: cover;
  border-radius: 5px;
}

.hits-card-bot {
  display: flex;
  width: 100%;
  height: 44px;
  align-items: center;
  justify-content: space-between;
  gap: 0;
}

.hits-price-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  flex-shrink: 0;
}

.hits-card-price {
  color: #000000;
  font-size: 24px;
  height: 20px;
  display: flex;
  align-items: center;
  font-family: "Mulish-Regular-400";
  font-weight: 600;
  line-height: 1;
}

.hits-old-price {
  text-decoration: line-through;
  color: #999;
  font-size: 14px;
  font-family: "Mulish-Light-300";
  line-height: 1;
  margin-top: 2px;
}

.hits-card-name {
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

.hits-card-button {
  width: 142px;
  height: 44px;
  background-color: transparent;
  border: 1px solid #000000;
  color: #000000;
  font-family:"Mulish-Light-300";
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

.hits-card-button:hover:not(:disabled) {
  background-color: #000000;
  color: #F4F6F5;
}

.hits-card-button.in-cart {
  background-color: #000000;
  color: #F4F6F5;
}

.hits-card-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.hits-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.hits-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #000000;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-family: "Mulish-Regular-400";
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.new-badge {
  position: absolute;
  top: 10px;
  left: 70px;
  background: #ff4444;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-family: "Mulish-Regular-400";
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Адаптивность */
@media (max-width: 768px) {
  .hits-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .hits-card {
    width: 100%;
  }
  
  .hits-card-bot {
    flex-direction: column;
    height: auto;
    gap: 10px;
    align-items: stretch;
  }
  
  .hits-card-button {
    width: 100%;
  }
  
  .hits-price-section {
    align-items: center;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .hits-grid {
    grid-template-columns: 1fr;
  }
  
  .hits-page {
    padding: 20px 10px;
  }
  
  .hits-page h1 {
    font-size: 36px;
    margin-bottom: 40px;
  }
}
</style>