<template>
    <!-- Верхний хедер -->
<header class="top-header">
   <nav class="top-nav">
      <div class="top-nav-left">
        <RouterLink :to="{ name: 'Promotions'}">АКЦИИ</RouterLink>
        <RouterLink to="/newproducts">НОВИНКИ</RouterLink>
        <RouterLink :to="{ name: 'About'}">О НАС</RouterLink>
      </div>
      
      <RouterLink :to="{ name: 'Home'}">
        <div class="header_logo">
          <img src="./assets/icons/logo1.svg" alt="лого">
        </div>
      </RouterLink> 

      <div class="top-nav-right">
        <RouterLink :to="{ name: 'Search'}" class="search_icon">
          <img src="./assets/icons/search.svg" alt="поиск">
        </RouterLink>       
        <RouterLink :to="{ name: 'Contacts'}" class="profile_icon">
          <img src="./assets/icons/phone.svg" alt="контакты">
        </RouterLink> 
        <RouterLink :to="{ name: 'Profile'}" class="profile_icon">
          <img src="./assets/icons/lk.svg" alt="профиль">
        </RouterLink>
        <RouterLink :to="{ name: 'Cart'}" class="profile_icon cart-icon">
          <img src="./assets/icons/cart.svg" alt="корзина">
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </RouterLink>
      </div>
    </nav>
</header>

<!-- Основной хедер -->
<header class="main-header">
  <nav class="main-nav">
    <div class="nav-links">
      <RouterLink :to="{ name: 'CategoryPage', params: { category: 'face' } }">ЛИЦО</RouterLink>
      <RouterLink :to="{ name: 'CategoryPage', params: { category: 'bath' } }">ВАННА И ДУШ</RouterLink>
      <RouterLink :to="{ name: 'CategoryPage', params: { category: 'body' } }">ТЕЛО</RouterLink>
      <RouterLink :to="{ name: 'CategoryPage', params: { category: 'hair' } }">ВОЛОСЫ</RouterLink>
      <RouterLink :to="{ name: 'CategoryPage', params: { category: 'men' } }">ДЛЯ НЕГО</RouterLink>
      <RouterLink :to="{ name: 'CategoryPage', params: { category: 'gifts' } }">ПОДАРКИ</RouterLink>
      <RouterLink :to="{ name: 'SeriesPage' }">СЕРИИ</RouterLink>
      <RouterLink :to="{ name: 'CategoryPage', params: { category: 'accessories' } }">АКСЕССУАРЫ</RouterLink>
    </div>
  </nav>
</header>
    
<!-- активная страница -->
<RouterView />  

<footer class="footer">
  <div class="brand-section">
          <div class="footer_logo">
            <img src="./assets/icons/logo2.svg" alt="лого">
          </div>
      <p >SAVONRY - бренд высококачественной и эффективной натуральной косметики с чистым растительным составом</p>
      <div class="social-links">
          <a href="https://web.whatsapp.com/" class="social-link vk" target="_blank"  rel="noopener noreferrer">
              <img src="./assets/icons/wapp.svg" alt="whatsapp" >
          </a>
          <a href="https://telegram.org" class="social-link telegram" target="_blank">
              <img src="./assets/icons/tg.svg" alt="tg" >
          </a>
          <a href="https://vk.com/" class="social-link instagram" target="_blank">
              <img src="./assets/icons/vk.svg" alt="vk">
          </a>
      </div>
      <div class="copyright">Copyright @ 2018-2023 Savonry.</div>
  </div>
  
  <div class="catalog-section">
      <div class="catalog-title">
        <p>Каталог</p>
      </div>
      <div class="catalog-table">
          <div class="link-group">
        <RouterLink to="/promotions">Акции</RouterLink>
        <RouterLink to="/newproducts">Новинки</RouterLink>
        <RouterLink to="/face">Лицо</RouterLink>
        <RouterLink to="/catalog1">Ванна и душ</RouterLink>
        <RouterLink to="/body">Тело</RouterLink>
        </div>
        <div class="link-group">
        <RouterLink to="/hair">Волосы</RouterLink>
        <RouterLink to="/men">Для него</RouterLink>
        <RouterLink to="/gifts">Подарки</RouterLink>
        <RouterLink to="/series">Серии</RouterLink>
        <RouterLink to="/accessories">Аксессуары</RouterLink>
          </div>
      </div>
  </div>

  <div class="client-section">
      <div class="client-title">
        <p>Для клиента</p>
      </div>
      <div class="client-table">
          <div class="link-group">
        <RouterLink to="/about">О нас</RouterLink>
        <RouterLink to="/contacts">Контакты</RouterLink>
        <RouterLink to="/about">Доставка и оплата</RouterLink>
        </div>
          <div class="link-group">
        <RouterLink to="/hair">Статьи</RouterLink>
        <RouterLink to="/men">Новости</RouterLink>
        <RouterLink to="/gifts">Оптовикам</RouterLink>
          </div>
      </div>
  </div>
</footer>
</template>

<script>
import { useCart } from '@/composables/useCart'
import { supabase } from '@/lib/supabase'
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'App',
  setup() {
    const categories = ref([])
    const { cartCount, loadCartCount } = useCart()
    const router = useRouter()
    const route = useRoute()

    const scrollToNewProducts = () => {
      // Если мы уже на главной странице
      if (route.path === '/') {
        const element = document.getElementById('new-products')
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          })
        }
      } else {
        // Если не на главной, переходим на главную с хэшем
        router.push('/#new-products')
        
        // После перехода скроллим к секции
        setTimeout(() => {
          const element = document.getElementById('new-products')
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            })
          }
        }, 100)
      }
    }

    const loadCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('sort_order', { ascending: true })
        
        if (error) throw error
        categories.value = data || []
        console.log('Загружено категорий:', categories.value.length)
      } catch (error) {
        console.error('Ошибка загрузки категорий:', error)
      }
    }

    onMounted(() => {
      loadCategories()
      loadCartCount()
    })

    return {
      categories,
      cartCount,
      scrollToNewProducts
    }
  }
}
</script>

<style scoped>
/* Базовые стили для примера */
.top-header {
  background-color: #f8f8f8;
  height: 99px;
  max-width: 1920px;
}

.top-nav{
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}
.top-nav-left{
  display: flex; 
  gap: 33px; 
}

.top-nav-left a{
  text-decoration: none;
  color: rgb(0, 0, 0);
  /* align-items: center; */
  padding: 40px 0px;
  font-family: "Mulish-Regular-400";
  font-weight: 400;
  font-size: 16px;
  gap: 33px;
}

/* Стиль для ссылки новинок */
.nav-link {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  padding: 40px 0px;
  font-family: "Mulish-Regular-400";
  font-weight: 400;
  font-size: 16px;
}

.nav-link:hover {
  color: #666;
}

.header_logo{
  width: 170px;
  height: 54px;
  padding: 23px 0;
}

.top-nav-right{
  display: flex;
  align-items: center;
  padding: 34px 0px;
  gap: 24px;
}

/* Стили для иконки корзины со счетчиком */
.cart-icon {
  position: relative;
  text-decoration: none; /* Убираем подчеркивание у всей ссылки корзины */
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #000;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none !important; /* Убираем подчеркивание у счетчика */
  font-family: "Mulish-Regular-400";
  font-weight: 400;
}

/* Убираем подчеркивание у всех ссылок в верхней навигации */
.top-nav-left a,
.top-nav-right a {
  text-decoration: none;
}

/* Убираем подчеркивание при наведении */
.top-nav-left a:hover,
.top-nav-right a:hover {
  text-decoration: none;
}

.main-header {
  background-color: rgb(0, 0, 0);
  height: 52px;
  text-decoration: none;
}

.main-nav {
  /* display: flex; */
  /* justify-content: space-between;
  align-items: center; */
  max-width: 1200px;
  margin: 0 auto;
}

.nav-links{
  display: flex;
  gap: 83px;
}

.nav-links a {
  font-family: "Mulish-Regular-400";
  font-weight: 400;
  font-size: 16px ;
  color: rgb(255, 255, 255);
  padding: 16px 0;
  text-decoration: none;
}


.footer{
  display: flex;
  background-color: #000000ff;
  max-height: 487px;
  max-width: 1920px;
  color: #fff;
  padding: 97px 427px 32px 359px;


  
}

.brand-section p{
  width: 284px;
  max-height: 96px;
  font-family: "Mulish-Light-300";
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: #817E79;
  margin-bottom: 27px;
}

.footer_logo{
  margin-bottom: 39px;
}

.social-links {
  gap: 17px;
  display: flex;
  margin-bottom: 87px;
}

.copyright{
  font-family: "Mulish-Light-300";
  font-weight: 300;
  font-size: 12px;
  color: #817E79;
}
  
.catalog-title{
  font-family: "Mulish-Regular-400";
  font-weight: 400;
  font-size: 24px;
  margin-bottom: 40px;
}

.catalog-table {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  width: 232px;
}

.link-group {
    display: flex;
    flex-direction: column;
    
}

.link-group a{
  font-family: "Mulish-Light-300";
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: white;
  text-decoration: none;
  margin-bottom: 16px;
  min-width: 145px;
}

.catalog-section{
  margin: 26px 147px 0 171px;

}

.client-section{
  margin: 26px 190px 0 0;
}

/* Правая колонка */
.client-title{
  font-family: "Mulish-Regular-400";
  font-weight: 400;
  font-size: 24px;
  margin-bottom: 40px;
}
.client-table{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 56px;
    
}
</style>