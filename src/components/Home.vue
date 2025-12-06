<template>
  <main>
    <div class="container">
      <div class="banner">
        <div class="banner-content">
            <h1>Новинка!</h1>
            <p>Встречай новую серию уходовой косметики</p>
            <RouterLink to="/series" class="banner-btn">Подробнее</RouterLink>              
        </div>
      </div>
    </div>
  </main>

   <section id="new-products" class="new-products-section">
    <div class="container">
      <div class="newproducts_content">
        <h2>Новинки</h2>
        <div class="newproducts_cards">
          <div 
            v-for="product in newProducts" 
            :key="product.id" 
            class="newproducts_card"
          >
            <RouterLink 
              :to="{ name: 'ProductDetail', params: { id: product.id } }"
              class="newproducts_card-link"
            >
              <div class="newproducts_card_top">
                <img 
                  :src="product.image_url || '/images/placeholder.jpg'" 
                  :alt="product.name" 
                  class="newproducts_card_image"
                  @error="handleImageError"
                >
                <div class="newproducts_badge">NEW</div>
              </div>
              <p class="newproducts_card_name">{{ product.name }}</p>
            </RouterLink>
            <div class="newproducts_card_bot">
              <div class="newproducts_price-section">
                <div class="newproducts_card_price">{{ product.price }} ₽</div>
                <div v-if="product.old_price" class="newproducts_old-price">{{ product.old_price }} ₽</div>
              </div>
              <button 
                class="newproducts_card_button"
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
        
        <!-- Добавляем кнопку "Смотреть все новинки" -->
        <div class="newproducts-all-container">
          <RouterLink to="/newproducts" class="newproducts-all-link">
            Смотреть все новинки
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 0L6.59 1.41L12.17 7H0V9H12.17L6.59 14.59L8 16L16 8L8 0Z" fill="currentColor"/>
            </svg>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="image_content">
        <img src="@/assets/images/home/advantages.png" alt="инфа" >
      </div>
    </div>
  </section>

  
  <!-- Добавляем секцию хитов -->
  <ProductHits />

  <section>
    <div class="container">
      <div class="about_title">
        <h4>О нас</h4>
      </div>
      <div class="about_content">
        <div class="about_img">
            <img src="@/assets/images/home/woman.png" alt="Женщина">
        </div>
        <div class="about_text">
            <h5>Производство косметики «SAVONRY» базируется на принципах арома — и фитотерапии, при строгом соблюдении рецептур и технологий.</h5>
            <p>Здоровье, безопасность и благополучие наших клиентов — главные приоритеты для нас. Мы стремимся предоставить продукты высокого качества, использование которых доставит вам удовольствие.</p>
            <RouterLink to="/about" class="about_button">Подробнее о нас</RouterLink>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
import { useCart } from '@/composables/useCart'
import { supabase } from '@/lib/supabase'
import { ref, onMounted } from 'vue'
import ProductHits from '@/components/ProductHits.vue'

export default {
  name: 'Home',
  components: {
    ProductHits
  },
  setup() {
    const newProducts = ref([])
    const { 
      handleAddToCart, 
      getProductQuantity, 
      isProductLoading,
      loadCartItems 
    } = useCart()

    // Загрузка новинок из БД
    const loadNewProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .limit(4)
          .order('created_at', { ascending: false })

        if (error) throw error
        newProducts.value = data || []
      } catch (error) {
        console.error('Ошибка загрузки товаров:', error)
      }
    }

    const addToCart = async (product) => {
      await handleAddToCart(product)
    }

    const handleImageError = (event) => {
      event.target.src = '@/assets/images/placeholder.jpg'
    }

    onMounted(async () => {
      await loadNewProducts()
      await loadCartItems() // Загружаем корзину при старте
    })

    return {
      newProducts,
      addToCart,
      handleImageError,
      getProductQuantity,
      isProductLoading
    }
  }
}
</script>

<style scoped>
/* Существующие стили без изменений */

.banner {
  background-image:linear-gradient( #00000026) , url('@/assets/images/home/banner-home.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  max-width: 1920px;
}

.banner-content {
  color: white;
  padding: 158px 678px;
}

.banner-content h1{
  font-family: "Raleway-SemiBold";
  font-weight: 600;
  font-size: 64px;
  text-align: center;
  padding: 16px 138;
}

.banner-content p{
font-family: "Mulish-Regular-400";
font-weight: 400;
font-size: 24px;
}

.banner-btn {
  width: 151px;
  height: 52px;
  border-radius: 10px;
  padding: 16px 32px;
  background-color: black;
  color: white;
  font-family: "Mulish-Regular-400";
  font-weight: 400;
  font-size: 16px;
  margin: 40px 206.5px 0;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block; /* Добавляем это свойство */
  text-decoration: none; /* Убираем подчеркивание ссылки */
  text-align: center; /* Выравниваем текст по центру */
  line-height: 20px; /* Выравниваем высоту строки */
  box-sizing: border-box; /* Учитываем padding в ширине/высоте */
}

.banner-btn:hover {
  background-color:  #323232;
  color: white;
}

.container{
  max-width: 1920px;
  padding: 0px;
  margin: 0 auto;
}

.newproducts_content h2{
  color: black;
  font-family: "Raleway-SemiBold";
  font-weight: 600;
  font-size: 48px;
  padding: 120px 868px 64px;
}

.newproducts_cards {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto ;
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  justify-content: center;
}

.newproducts_card {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  flex-basis: 270px;
  position: relative;
}

.newproducts_card_top{
  height: auto;
  margin-bottom: 18px;
  position: relative;
}

.newproducts_card_image {
  width: 100%;
  height: 270px;
  width: 270px;
  margin-bottom: 16px;
  object-fit: cover;
}

.newproducts_card_bot{
  display: flex;
  width: 100%;
  height: 44px;
  align-items: center;
  justify-content: space-between;
  gap: 0;
}

.newproducts_price-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  flex-shrink: 0;
}

.newproducts_card_price {
  color: #000000;
  font-size: 24px;
  height: 20px;
  display: flex;
  align-items: center;
  font-family: "Mulish-Regular-400";
  font-weight: 600;
  line-height: 1;
}

.newproducts_old-price {
  text-decoration: line-through;
  color: #999;
  font-size: 14px;
  font-family: "Mulish-Light-300";
  line-height: 1;
  margin-top: 2px;
}

.newproducts_card_name {
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

.newproducts_card_button {
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

.newproducts_card_button:hover:not(:disabled) {
  background-color: #000000;
  color: #F4F6F5;
}

.newproducts_card_button.in-cart {
  background-color: #000000;
  color: #F4F6F5;
}

.newproducts_card_button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.newproducts_card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.newproducts_badge {
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

/* Контейнер для кнопки "Смотреть все новинки" */
.newproducts-all-container {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 40px;
}

/* Кнопка "Смотреть все новинки" */
.newproducts-all-link {
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

.newproducts-all-link:hover {
  background-color: #000000;
  color: #F4F6F5;
}

.image_content{
  max-width: 1200px;
  padding: 120px 360px;
}

.about_title {
  font-family: "Raleway-SemiBold";
  font-weight: 600;
  font-size: 48px;
  color: #000;
  text-align: center;
  margin-bottom: 51px;
}

.about_content {
  display: flex;
  align-items: center;
  justify-content: center; /* Центрируем контент */
  gap: 122px;
  margin: 0 auto 120px;
  max-width: 1200px; /* Ограничиваем максимальную ширину */
  padding: 0 20px; /* Добавляем отступы */
  flex-wrap: nowrap; /* Запрещаем перенос */
}

.about_img {
  flex: 0 0 auto; /* Запрещаем сжатие и растяжение */
  width: 622px;
  height: 526px;
}

.about_img img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Сохраняем пропорции изображения */
  border-radius: 10px; /* Добавляем скругление если нужно */
}

.about_text {
  flex: 0 0 auto; /* Запрещаем сжатие и растяжение */
  width: 488px;
  height: auto; /* Меняем фиксированную высоту на auto */
}

.about_text h5 {
  font-size: 24px;
  font-weight: 400;
  line-height: 100%;
  color: #000000;
  margin-bottom: 32px;
  font-family: "Mulish-Regular-400";
}

.about_text p {
  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
  color: #000000;
  margin-bottom: 32px;
  font-family: "Mulish-Light-300";
  font-weight: 300;
}

.about_button {
  background-color: #000000; 
  color: #ffffff;
  width: 196px;
  height: 52px;
  border-radius: 10px;
  padding: 16px 32px;
  font-family: "Mulish-Regular-400";
  font-weight: 400;
  font-size: 15px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  line-height: 20px;
  box-sizing: border-box;
  transition: background-color 0.3s ease;
}

.about_button:hover {
  background-color: #323232;
  color: white;
}


/* Адаптивность для мобильных */
@media (max-width: 768px) {
  .newproducts_content h2 {
    padding: 80px 20px 40px;
    text-align: center;
    font-size: 36px;
  }
  
  .newproducts_cards {
    gap: 20px;
  }
  
  .newproducts_card {
    flex-basis: calc(50% - 20px);
  }
  
  .newproducts_card_bot {
    flex-direction: column;
    height: auto;
    gap: 10px;
    align-items: stretch;
  }
  
  .newproducts_card_button {
    width: 100%;
  }
  
  .newproducts_price-section {
    align-items: center;
    text-align: center;
  }
  
  .newproducts-all-container {
    margin-top: 30px;
  }
}

@media (max-width: 480px) {
  .newproducts_card {
    flex-basis: 100%;
  }
}
</style>
