<template>
  <section>
    <div class="container">
      <Breadcrumbs />
      <div class="promotions-content">
        <h1>Акции</h1>
        <p class="promotions-subtitle">Специальные предложения и выгодные скидки</p>
        
        <div v-if="loading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>Загружаем акционные товары...</p>
        </div>
        
        <div v-else-if="products.length === 0" class="empty-state">
          <p>В данный момент акционных товаров нет</p>
        </div>
        
        <div v-else class="promotions-cards">
          <div 
            v-for="product in products" 
            :key="product.id" 
            class="promotions-card"
          >
            <RouterLink 
              :to="{ name: 'ProductDetail', params: { id: product.id } }"
              class="promotions-card-link"
            >
              <div class="promotions-card-top">
                <img 
                  :src="product.image_url || '/images/placeholder.jpg'" 
                  :alt="product.name" 
                  class="promotions-card-image"
                  @error="handleImageError"
                >
                <!-- Бейджи как в CategoryPage -->
                <div v-if="product.is_new" class="category-badge new">NEW</div>
                <div class="category-badge sale">SALE</div>
                <div v-if="product.is_hit" class="category-badge hit">ХИТ</div>
                
                <!-- Дополнительный бейдж скидки -->
                <div v-if="product.old_price" class="discount-badge">
                  -{{ calculateDiscount(product) }}%
                </div>
              </div>
              <p class="promotions-card-name">{{ product.name }}</p>
            </RouterLink>
            <div class="promotions-card-bot">
              <div class="promotions-price-section">
                <div class="promotions-card-price">{{ formatPrice(product.price) }} ₽</div>
                <div v-if="product.old_price" class="promotions-old-price">
                  {{ formatPrice(product.old_price) }} ₽
                </div>
              </div>
              <button 
                class="promotions-card-button"
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
  </section>

  <!-- Секция хитов как в CategoryPage -->
  <ProductHits />
</template>

<script>
import { useCart } from '@/composables/useCart'
import { supabase } from '@/lib/supabase'
import { ref, onMounted } from 'vue'
import ProductHits from '@/components/ProductHits.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'

export default {
  name: 'PromotionsPage',
  components: {
    ProductHits,
    Breadcrumbs
  },
  setup() {
    const products = ref([])
    const loading = ref(true)
    const { 
      handleAddToCart, 
      getProductQuantity, 
      isProductLoading,
      loadCartItems 
    } = useCart()

    // Загрузка только акционных товаров
    const loadPromotionProducts = async () => {
      try {
        loading.value = true
        
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_promotion', true)
          .eq('is_active', true)
          .order('created_at', { ascending: false })

        if (error) throw error
        products.value = data || []
      } catch (error) {
        console.error('Ошибка загрузки акционных товаров:', error)
        products.value = []
      } finally {
        loading.value = false
      }
    }

    // Расчет скидки в процентах
    const calculateDiscount = (product) => {
      if (!product.old_price) return 0
      const discount = ((product.old_price - product.price) / product.old_price) * 100
      return Math.round(discount)
    }

    // Форматирование цены
    const formatPrice = (price) => {
      return parseFloat(price).toFixed(0)
    }

    const addToCart = async (product) => {
      await handleAddToCart(product)
    }

    const handleImageError = (event) => {
      event.target.src = '/images/placeholder.jpg'
    }

    onMounted(async () => {
      await loadPromotionProducts()
      await loadCartItems()
    })

    return {
      products,
      loading,
      addToCart,
      handleImageError,
      getProductQuantity,
      isProductLoading,
      calculateDiscount,
      formatPrice
    }
  }
}
</script>

<style scoped>
.promotions-card-button.in-cart {
  background-color: #000000;
  color: #F4F6F5;
}

.promotions-card-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.container{
  max-width: 1920px;
  padding: 0px;
  margin: 0 auto;
}

.promotions-content h1{
  color: black;
  font-family: "Raleway-SemiBold";
  font-weight: 600;
  font-size: 48px;
  padding: 95px 0px 40px 360px;
}

.promotions-subtitle {
  color: #666;
  font-family: "Mulish-Regular-400";
  font-size: 18px;
  padding: 0 0 40px 360px;
  margin-top: -20px;
}

.promotions-cards {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  justify-content: center;
}

.promotions-card {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  flex-basis: 270px;
  position: relative;
  transition: transform 0.3s ease;
}
.promotions-card:hover {
  transform: translateY(-5px);
}

.promotions-card-top{
  height: 270px;
  margin-bottom: 18px;
  position: relative;
}

.promotions-card-image {
  width: 100%;
  height: 270px;
  width: 270px;
  margin-bottom: 16px;
  object-fit: cover;
}

.promotions-card-bot{
  display: flex;
  width: 100%;
  height: 44px;
  align-items: center;
  justify-content: space-between;
  gap: 0;
}

.promotions-price-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  flex-shrink: 0;
}

.promotions-card-price {
  color: #000000;
  font-size: 24px;
  height: 20px;
  display: flex;
  align-items: center;
  font-family: "Mulish-Regular-400";
  font-weight: 600;
  line-height: 1;
}

.promotions-old-price {
  text-decoration: line-through;
  color: #999;
  font-size: 14px;
  font-family: "Mulish-Light-300";
  line-height: 1;
  margin-top: 2px;
}

.promotions-card-name {
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

.promotions-card-button {
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

.promotions-card-button:hover:not(:disabled) {
  background-color: #000000;
  color: #F4F6F5;
}

.promotions-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

/* Используем те же бейджи что и в CategoryPage */
.category-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  color: white;
  padding: 6px 12px;
  border-radius: 4px;
  font-family: "Mulish-Regular-400";
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.category-badge.new {
  background: #000000;
}

.category-badge.sale {
  background: #ff4444;
}

.category-badge.hit {
  background: #000000;
}

/* Бейдж скидки в процентах */
.discount-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff4444;
  color: white;
  padding: 6px 10px;
  border-radius: 4px;
  font-family: "Mulish-Regular-400";
  font-weight: 600;
  font-size: 14px;
}

/* Если несколько бейджей, можно добавить отступы для следующих */
.category-badge:nth-child(2) {
  top: 40px;
}

.category-badge:nth-child(3) {
  top: 70px;
}

/* Состояния загрузки */
.loading-state {
  text-align: center;
  padding: 60px 0;
  color: #666;
}

.loading-spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #000000;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 60px 0;
  color: #666;
  font-family: "Mulish-Regular-400";
  font-size: 18px;
}

/* Адаптивность */
@media (max-width: 768px) {
  .promotions-content h1 {
    padding: 80px 20px 20px;
    text-align: center;
    font-size: 36px;
  }
  
  .promotions-subtitle {
    padding: 0 20px 40px;
    text-align: center;
  }
  
  .promotions-cards {
    gap: 20px;
    padding: 0 20px;
  }
  
  .promotions-card {
    flex-basis: calc(50% - 20px);
  }
  
  .promotions-card-bot {
    flex-direction: column;
    height: auto;
    gap: 10px;
    align-items: stretch;
  }
  
  .promotions-card-button {
    width: 100%;
  }
  
  .promotions-price-section {
    align-items: center;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .promotions-card {
    flex-basis: 100%;
  }
}
</style>