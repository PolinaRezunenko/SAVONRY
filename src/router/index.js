import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/components/Home.vue'
import Promotions from '@/components/Promotions.vue'
import Profile from '@/components/Profile.vue'
import NewProducts from '@/components/NewProducts.vue'
import About from '@/components/About.vue'
import Search from '@/components/Search.vue'
import Contacts from '@/components/Contacts.vue'
import Cart from '@/components/Cart.vue'
import CategoryPage from '@/components/CategoryPage.vue'
import ProductDetail from '@/components/ProductDetail.vue'
import SeriesPage from '@/components/SeriesPage.vue'
import SeriesDetail from '@/components/SeriesDetail.vue'
import HitsPage from '@/components/HitsPage.vue' // ДОБАВЛЯЕМ ИМПОРТ

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/promotions', name: 'Promotions', component: Promotions },  
  { path: '/profile', name: 'Profile', component: Profile },
  { path: '/newproducts', name: 'NewProducts', component: NewProducts },
  { path: '/about', name: 'About', component: About },
  { path: '/search', name: 'Search', component: Search },
  { path: '/contacts', name: 'Contacts', component: Contacts },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/product/:id', name: 'ProductDetail', component: ProductDetail },
  
  // ДОБАВЛЯЕМ МАРШРУТ ДЛЯ ХИТОВ
  { path: '/hits', name: 'HitsPage', component: HitsPage },
  
  // УНИВЕРСАЛЬНЫЙ МАРШРУТ ДЛЯ ВСЕХ КАТЕГОРИЙ
  { path: '/category/:category', name: 'CategoryPage', component: CategoryPage },
  
  // МАРШРУТЫ ДЛЯ СЕРИЙ
  { path: '/series', name: 'SeriesPage', component: SeriesPage },
  { path: '/series/:id', name: 'SeriesDetail', component: SeriesDetail },
  
  // РЕДИРЕКТЫ СО СТАРЫХ URL НА НОВЫЕ
  { path: '/catalog1', redirect: '/category/bath' },
  { path: '/face', redirect: '/category/face' },
  { path: '/body', redirect: '/category/body' },
  { path: '/hair', redirect: '/category/hair' },
  { path: '/men', redirect: '/category/men' },
  { path: '/gifts', redirect: '/category/gifts' },
  { path: '/series-old', redirect: '/series' },
  { path: '/accessories', redirect: '/category/accessories' }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,

  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 100 // отступ сверху
      }
    }
    return { top: 0 }
  }
})

export default router