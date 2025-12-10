<template>
  <section class="hits-section">
    <div class="container">
      <div class="hits-content">
        <h2 class="hits-title">Хиты продаж</h2>
        <p class="hits-subtitle">Самые популярные товары среди наших покупателей</p>
        
        <div class="hits-cards">
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
        
        <RouterLink to="/hits" class="hits-all-link">
          Смотреть все хиты
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
          </svg>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script>
import { useCart } from '@/composables/useCart'
import { supabase } from '@/lib/supabase'
import { ref, onMounted } from 'vue'

export default {
  name: 'ProductHits',
  setup() {
    const hitProducts = ref([])
    const { 
      handleAddToCart, 
      getProductQuantity, 
      isProductLoading 
    } = useCart()

    // Загрузка хитов продаж из БД
    const loadHitProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('is_popular', true)
          .limit(4)
          .order('created_at', { ascending: false })

        if (error) throw error
        
        if (data && data.length > 0) {
          hitProducts.value = data
        } else {
          // Если нет товаров с is_hit, используем последние 4 товара как заглушку
          const { data: fallbackData } = await supabase
            .from('products')
            .select('*')
            .limit(4)
            .order('created_at', { ascending: false })
          
          hitProducts.value = fallbackData || getFallbackProducts()
        }
      } catch (error) {
        console.error('Ошибка загрузки хитов:', error)
        hitProducts.value = getFallbackProducts()
      }
    }

    // Заглушки для демонстрации
    const getFallbackProducts = () => [
      {
        id: '1',
        name: 'Набор для ванны "Ванильный эспрессо"',
        price: 740,
        old_price: 890,
        image_url: '@/assets/images/hit1.png'
      },
      {
        id: '2', 
        name: 'Гель для душа "Цитрусовый микс"',
        price: 450,
        image_url: '@/assets/images/hit2.png'
      },
      {
        id: '3',
        name: 'Пена для ванны "Цветочная нежность"', 
        price: 520,
        old_price: 650,
        image_url: '@/assets/images/hit3.png'
      },
      {
        id: '4',
        name: 'Скраб для тела "Лесные ягоды"',
        price: 680,
        image_url: '@/assets/images/hit4.png'
      }
    ]

    const addToCart = async (product) => {
      await handleAddToCart(product)
    }

    const handleImageError = (event) => {
      event.target.src = '@/assets/images/placeholder.jpg'
    }

    onMounted(() => {
      loadHitProducts()
    })

    return {
      hitProducts,
      addToCart,
      handleImageError,
      getProductQuantity,
      isProductLoading
    }
  }
}
</script>

<style scoped>
.hits-section {
  padding: 120px 0;
  background-color: #ffffff;
  width: 100%; /* Добавляем полную ширину */
}

.hits-content {
  max-width: 1200px; /* Такая же ширина как у новинок */
  width: 100%;
  margin: 0 auto;
  text-align: center;

}

.hits-title {
  font-family: "Raleway-SemiBold";
  font-weight: 600;
  font-size: 48px;
  color: #000;
  margin-bottom: 16px;
}

.hits-subtitle {
  font-family: "Mulish-Light-300";
  font-weight: 300;
  font-size: 18px;
  color: #666;
  margin-bottom: 64px;
}

.hits-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  width: 100%; /* Полная ширина внутри контейнера */
  margin: 0 auto 60px;
}

.hits-card {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  transition: transform 0.3s ease;
}
.hits-card:hover {
  transform: translateY(-5px);
}

.hits-card-top {
  height: auto;
  margin-bottom: 18px;
  position: relative;
}

.hits-card-image {
  width: 100%;
  height: 270px;
  object-fit: cover;
  border-radius: 5px;
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

.hits-card-button {
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

.hits-all-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: "Mulish-Regular-400";
  font-weight: 400;
  font-size: 16px;
  color: #000;
  text-decoration: none;
  padding: 16px 32px;
  border: 1px solid #000000;
  border-radius: 10px;
  transition: all 0.3s ease;
  background-color: transparent;
}

.hits-all-link:hover {
  background-color: #000000;
  color: #F4F6F5;
}

/* Адаптивность для Grid */
@media (max-width: 1200px) {
  .hits-cards {
    gap: 30px;
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 1024px) {
  .hits-cards {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .hits-section {
    padding: 80px 0;
  }
  
  .hits-title {
    font-size: 36px;
  }
  
  .hits-cards {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
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
  .hits-cards {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>