<template>
  <nav class="breadcrumbs" v-if="breadcrumbs.length > 1">
    <div class="breadcrumbs-container">
      <ul class="breadcrumbs-list">
        <li 
          v-for="(crumb, index) in breadcrumbs" 
          :key="crumb.path" 
          class="breadcrumbs-item"
        >
          <RouterLink 
            v-if="index < breadcrumbs.length - 1"
            :to="crumb.path" 
            class="breadcrumbs-link"
          >
            {{ crumb.title }}
          </RouterLink>
          <span v-else class="breadcrumbs-current">
            {{ crumb.title }}
          </span>
          <span 
            v-if="index < breadcrumbs.length - 1" 
            class="breadcrumbs-separator"
          >
            /
          </span>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '@/lib/supabase'

export default {
  name: 'Breadcrumbs',
  setup() {
    const route = useRoute()
    const productName = ref('')
    const seriesName = ref('')
    
    const breadcrumbs = computed(() => {
      const crumbs = []
      
      // Всегда добавляем главную страницу
      crumbs.push({
        title: 'Главная',
        path: '/'
      })
      
      // Определяем крошки в зависимости от текущего маршрута
      if (route.name === 'Promotions') {
        crumbs.push({
          title: 'Акции',
          path: '/promotions'
        })
      } else if (route.name === 'NewProducts') {
        crumbs.push({
          title: 'Новинки',
          path: '/new-products'
        })
      } else if (route.name === 'About') {
        crumbs.push({
          title: 'О нас',
          path: '/about'
        })
      } else if (route.name === 'CategoryPage') {
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
        const categoryTitle = categoryMap[route.params.category] || 'Категория'
        crumbs.push({
          title: categoryTitle,
          path: `/category/${route.params.category}`
        })
      } else if (route.name === 'Search') {
        crumbs.push({
          title: 'Поиск',
          path: '/search'
        })
      } else if (route.name === 'Contacts') {
        crumbs.push({
          title: 'Контакты',
          path: '/contacts'
        })
      } else if (route.name === 'Profile') {
        crumbs.push({
          title: 'Профиль',
          path: '/profile'
        })
      } else if (route.name === 'Cart') {
        crumbs.push({
          title: 'Корзина',
          path: '/cart'
        })
      } else if (route.name === 'SeriesPage') {
        crumbs.push({
          title: 'Серии',
          path: '/series'
        })
      } else if (route.name === 'SeriesDetail') {
        crumbs.push({
          title: 'Серии',
          path: '/series'
        })
        if (seriesName.value) {
          crumbs.push({
            title: seriesName.value,
            path: route.path
          })
        }
      }
      
      // Для страниц товаров
      if (route.name === 'ProductDetail' && route.params.id) {
        // Добавляем категорию товара, если известна
        if (productName.value) {
          crumbs.push({
            title: productName.value,
            path: route.path
          })
        } else {
          // Временно показываем "Товар", пока загружается название
          crumbs.push({
            title: 'Товар',
            path: route.path
          })
        }
      }
      
      return crumbs
    })
    
    // Загрузка названия товара для страницы товара
    const loadProductName = async (productId) => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('name')
          .eq('id', productId)
          .single()
        
        if (error) throw error
        productName.value = data?.name || 'Товар'
      } catch (error) {
        console.error('Ошибка загрузки названия товара:', error)
        productName.value = 'Товар'
      }
    }

    // Загрузка названия серии для страницы серии
    const loadSeriesName = async (seriesId) => {
      try {
        const { data, error } = await supabase
          .from('series')
          .select('name')
          .eq('id', seriesId)
          .single()
        
        if (error) throw error
        seriesName.value = data?.name || 'Серия'
      } catch (error) {
        console.error('Ошибка загрузки названия серии:', error)
        seriesName.value = 'Серия'
      }
    }
    
    // Следим за изменением ID товара в маршруте
    watch(() => route.params.id, (newId) => {
      if (newId && route.name === 'ProductDetail') {
        loadProductName(newId)
      }
      if (newId && route.name === 'SeriesDetail') {
        loadSeriesName(newId)
      }
    }, { immediate: true })

    // Также следим за изменением самого маршрута
    watch(() => route.name, (newName) => {
      if (newName === 'SeriesDetail' && route.params.id) {
        loadSeriesName(route.params.id)
      }
    }, { immediate: true })
    
    return {
      breadcrumbs
    }
  }
}
</script>

<style scoped>
.breadcrumbs {
  background-color: #f8f8f8;
  border-bottom: 1px solid #eaeaea;
  padding: 12px 0;
}

.breadcrumbs-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.breadcrumbs-list {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 8px;
  font-size: 14px;
}

.breadcrumbs-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.breadcrumbs-link {
  color: #666;
  text-decoration: none;
  transition: color 0.3s ease;
  font-family: "Mulish-Regular-400";
  font-weight: 400;
}

.breadcrumbs-link:hover {
  color: #000;
  text-decoration: underline;
}

.breadcrumbs-separator {
  color: #999;
  font-size: 12px;
}

.breadcrumbs-current {
  color: #000;
  font-weight: 500;
  font-family: "Mulish-Regular-400";
}

/* Адаптивность для мобильных */
@media (max-width: 768px) {
  .breadcrumbs-container {
    padding: 0 16px;
  }
  
  .breadcrumbs-list {
    font-size: 12px;
    flex-wrap: wrap;
  }
}
</style>