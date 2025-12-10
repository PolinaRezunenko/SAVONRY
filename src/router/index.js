import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/components/Home.vue' // Главная страница - критически важна
import Search from '@/components/Search.vue' // Поиск - используется часто
import Cart from '@/components/Cart.vue' // Корзина - критична для конверсии

const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: Home 
  },
  { 
    path: '/promotions', 
    name: 'Promotions', 
    component: () => import('@/components/Promotions.vue')
  },  
  { 
    path: '/profile', 
    name: 'Profile', 
    component: () => import('@/components/Profile.vue')
  },
  { 
    path: '/newproducts', 
    name: 'NewProducts', 
    component: () => import('@/components/NewProducts.vue')
  },
  { 
    path: '/about', 
    name: 'About', 
    component: () => import('@/components/About.vue')
  },
  { 
    path: '/search', 
    name: 'Search', 
    component: Search 
  },
  
  { 
    path: '/cart', 
    name: 'Cart', 
    component: Cart 
  },
  { 
    path: '/product/:id', 
    name: 'ProductDetail', 
    component: () => import('@/components/ProductDetail.vue')
  },
  { 
    path: '/hits', 
    name: 'HitsPage', 
    component: () => import('@/components/HitsPage.vue')
  },
  { 
    path: '/category/:category', 
    name: 'CategoryPage', 
    component: () => import('@/components/CategoryPage.vue')
  },
  { 
    path: '/series', 
    name: 'SeriesPage', 
    component: () => import('@/components/SeriesPage.vue')
  },
  { 
    path: '/series/:id', 
    name: 'SeriesDetail', 
    component: () => import('@/components/SeriesDetail.vue')
  },
  
  // РЕДИРЕКТЫ СО СТАРЫХ URL НА НОВЫЕ
  { 
    path: '/category/bath',
    redirect: '/category/bath'
  },
  { 
    path: '/category/face',
    redirect: '/category/face'
  },
  { 
    path: '/category/body',
    redirect: '/category/body'
  },
  { 
    path: '/category/hair',
    redirect: '/category/hair'
  },
  { 
    path: '/category/men',
    redirect: '/category/men'
  },
  { 
    path: '/category/gifts',
    redirect: '/category/gifts'
  },
  { 
    path: '/series',
    redirect: '/series'
  },
  { 
    path: '/category/accessories',
    redirect: '/category/accessories'
  }
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