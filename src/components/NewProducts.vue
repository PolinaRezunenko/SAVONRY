<template>
  <section>
    <div class="container">
      <Breadcrumbs />
      <div class="newproducts-page">
        <h1>Новинки</h1>
        
        <div v-if="loading" class="loading">
          <p>Загрузка новинок...</p>
        </div>

        <div v-else-if="newProducts.length === 0" class="empty-products">
          <p>Новинок пока нет</p>
          <RouterLink to="/" class="continue-shopping">Вернуться на главную</RouterLink>
        </div>

        <div v-else class="newproducts-content">
          <div class="newproducts-grid">
            <div 
              v-for="product in newProducts" 
              :key="product.id" 
              class="newproducts-card"
            >
              <RouterLink 
                :to="{ name: 'ProductDetail', params: { id: product.id } }"
                class="newproducts-card-link"
              >
                <div class="newproducts-card-top">
                  <img 
                    :src="product.image_url || '/images/placeholder.jpg'" 
                    :alt="product.name" 
                    class="newproducts-card-image"
                    @error="handleImageError"
                  >
                  <div class="newproducts-badge">NEW</div>
                </div>
                <p class="newproducts-card-name">{{ product.name }}</p>
              </RouterLink>
              <div class="newproducts-card-bot">
                <div class="newproducts-price-section">
                  <div class="newproducts-card-price">{{ product.price }} ₽</div>
                  <div v-if="product.old_price" class="newproducts-old-price">{{ product.old_price }} ₽</div>
                </div>
                <button 
                  class="newproducts-card-button"
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

  <!-- Добавляем секцию хитов -->
  <ProductHits />
</template>

<script>
import { useCart } from '@/composables/useCart'
import { supabase } from '@/lib/supabase'
import { ref, onMounted } from 'vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import ProductHits from '@/components/ProductHits.vue'

export default {
  name: 'NewProducts',
  components: {
    Breadcrumbs,
    ProductHits
  },
  setup() {
    const newProducts = ref([])
    const loading = ref(true)
    const { 
      handleAddToCart, 
      getProductQuantity, 
      isProductLoading,
      loadCartItems 
    } = useCart()

    // Загрузка всех новинок из БД
    const loadNewProducts = async () => {
      try {
        loading.value = true
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_new', true)
          .eq('is_active', true)
          .order('created_at', { ascending: false })

        if (error) throw error
        newProducts.value = data || []
      } catch (error) {
        console.error('Ошибка загрузки новинок:', error)
        newProducts.value = []
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
      await loadNewProducts()
      await loadCartItems()
    })

    return {
      newProducts,
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
.newproducts-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.newproducts-page h1 {
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

.newproducts-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Четко 4 колонки */
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  justify-items: center;
}

.newproducts-card {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 270px;
  position: relative;
  transition: transform 0.3s ease;
}

.newproducts-card:hover {
  transform: translateY(-5px);
}

.newproducts-card-top {
  height: auto;
  margin-bottom: 18px;
  position: relative;
}

.newproducts-card-image {
  width: 100%;
  height: 270px;
  object-fit: cover;
  border-radius: 5px;
}

.newproducts-card-bot {
  display: flex;
  width: 100%;
  height: 44px;
  align-items: center;
  justify-content: space-between;
  gap: 0;
}

.newproducts-price-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  flex-shrink: 0;
}

.newproducts-card-price {
  color: #000000;
  font-size: 24px;
  height: 20px;
  display: flex;
  align-items: center;
  font-family: "Mulish-Regular-400";
  font-weight: 600;
  line-height: 1;
}

.newproducts-old-price {
  text-decoration: line-through;
  color: #999;
  font-size: 14px;
  font-family: "Mulish-Light-300";
  line-height: 1;
  margin-top: 2px;
}

.newproducts-card-name {
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

.newproducts-card-button {
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

.newproducts-card-button:hover:not(:disabled) {
  background-color: #000000;
  color: #F4F6F5;
}

.newproducts-card-button.in-cart {
  background-color: #000000;
  color: #F4F6F5;
}

.newproducts-card-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.newproducts-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.newproducts-badge {
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

/* Адаптивность для Grid */
@media (max-width: 1200px) {
  .newproducts-grid {
    gap: 30px;
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1024px) {
  .newproducts-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .newproducts-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
  
  .newproducts-card-bot {
    flex-direction: column;
    height: auto;
    gap: 10px;
    align-items: stretch;
  }
  
  .newproducts-card-button {
    width: 100%;
  }
  
  .newproducts-price-section {
    align-items: center;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .newproducts-grid {
    grid-template-columns: 1fr;
  }
  
  .newproducts-page {
    padding: 20px 10px;
  }
  
  .newproducts-page h1 {
    font-size: 36px;
    margin-bottom: 40px;
  }
}
</style>