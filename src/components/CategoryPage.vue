<template>
  <section>
    <Breadcrumbs />
    <div class="container">
      <div class="category-content">
        <h1>{{ categoryTitle }}</h1>
        <div class="category-cards">
          <div 
            v-for="product in products" 
            :key="product.id" 
            class="category-card"
          >
            <RouterLink 
              :to="{ name: 'ProductDetail', params: { id: product.id } }"
              class="category-card-link"
            >
              <div class="category-card-top">
                <img 
                  :src="product.image_url || '/images/placeholder.jpg'" 
                  :alt="product.name" 
                  class="category-card-image"
                  @error="handleImageError"
                >
                <div v-if="product.is_new" class="category-badge new">NEW</div>
                <div v-if="product.is_promotion" class="category-badge sale">SALE</div>
                <div v-if="product.is_hit" class="category-badge hit">ХИТ</div>
              </div>
              <p class="category-card-name">{{ product.name }}</p>
            </RouterLink>
            <div class="category-card-bot">
              <div class="category-price-section">
                <div class="category-card-price">{{ product.price }} ₽</div>
                <div v-if="product.old_price" class="category-old-price">{{ product.old_price }} ₽</div>
              </div>
              <button 
                class="category-card-button"
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

  <!-- Добавляем секцию хитов -->
  <ProductHits />
</template>

<script>
import { useCart } from '@/composables/useCart'
import { supabase } from '@/lib/supabase'
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProductHits from '@/components/ProductHits.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'

export default {
  name: 'CategoryPage',
  components: {
    ProductHits,
    Breadcrumbs
  },
  setup() {
    const products = ref([])
    const route = useRoute()
    const { 
      handleAddToCart, 
      getProductQuantity, 
      isProductLoading,
      loadCartItems 
    } = useCart()

    const categoryTitle = computed(() => {
      const categoryMap = {
        'face': 'Лицо',
        'bath': 'Ванна и душ', 
        'body': 'Тело',
        'hair': 'Волосы',
        'men': 'Для него',
        'gifts': 'Подарки',
        'series': 'Серии',
        'accessories': 'Аксессуары'
      }
      return categoryMap[route.params.category] || 'Каталог'
    })

    const loadProducts = async () => {
      try {
        // Находим ID категории по slug
        const { data: categoryData } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', route.params.category)
          .single()

        if (!categoryData) {
          console.log('Категория не найдена')
          products.value = []
          return
        }

        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category_id', categoryData.id)
          .order('created_at', { ascending: false })

        if (error) throw error
        products.value = data || []
      } catch (error) {
        console.error('Ошибка загрузки товаров:', error)
        products.value = []
      }
    }

    const addToCart = async (product) => {
      await handleAddToCart(product)
    }

    const handleImageError = (event) => {
      event.target.src = '@/assets/images/placeholder.jpg'
    }

    onMounted(async () => {
      await loadProducts()
      await loadCartItems() // Загружаем корзину при старте
    })

    watch(() => route.params.category, () => {
      loadProducts()
    })

    return {
      products,
      categoryTitle,
      addToCart,
      handleImageError,
      getProductQuantity,
      isProductLoading
    }
  }
}
</script>

<style scoped>
.category-card-button.in-cart {
  background-color: #000000;
  color: #F4F6F5;
}

.category-card-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.container{
  max-width: 1920px;
  padding: 0px;
  margin: 0 auto;
}

.category-content h1{
  color: black;
  font-family: "Raleway-SemiBold";
  font-weight: 600;
  font-size: 48px;
  padding: 95px 0px 40px 360px;
}

.category-cards {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  justify-content: center;
}

.category-card {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  flex-basis: 270px;
  position: relative;
}

.category-card-top{
  height: auto;
  margin-bottom: 18px;
  position: relative;
}

.category-card-image {
  width: 100%;
  height: 270px;
  width: 270px;
  margin-bottom: 16px;
  object-fit: cover;
}

.category-card-bot{
  display: flex;
  width: 100%;
  height: 44px;
  align-items: center;
  justify-content: space-between;
  gap: 0;
}

.category-price-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  flex-shrink: 0;
}

.category-card-price {
  color: #000000;
  font-size: 24px;
  height: 20px;
  display: flex;
  align-items: center;
  font-family: "Mulish-Regular-400";
  font-weight: 600;
  line-height: 1;
}

.category-old-price {
  text-decoration: line-through;
  color: #999;
  font-size: 14px;
  font-family: "Mulish-Light-300";
  line-height: 1;
  margin-top: 2px;
}

.category-card-name {
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

.category-card-button {
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

.category-card-button:hover:not(:disabled) {
  background-color: #000000;
  color: #F4F6F5;
}

.category-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

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

/* Если несколько бейджей, можно добавить отступы для следующих */
.category-badge:nth-child(2) {
  top: 40px;
}

.category-badge:nth-child(3) {
  top: 70px;
}

/* Адаптивность */
@media (max-width: 768px) {
  .category-content h1 {
    padding: 80px 20px 40px;
    text-align: center;
    font-size: 36px;
  }
  
  .category-cards {
    gap: 20px;
    padding: 0 20px;
  }
  
  .category-card {
    flex-basis: calc(50% - 20px);
  }
  
  .category-card-bot {
    flex-direction: column;
    height: auto;
    gap: 10px;
    align-items: stretch;
  }
  
  .category-card-button {
    width: 100%;
  }
  
  .category-price-section {
    align-items: center;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .category-card {
    flex-basis: 100%;
  }
}
</style>
