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
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'Breadcrumbs',
  setup() {
    const route = useRoute()
    
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
      } else if (route.name === 'Face') {
        crumbs.push({
          title: 'Лицо',
          path: '/face'
        })
      } else if (route.name === 'Catalog1') {
        crumbs.push({
          title: 'Ванна и душ',
          path: '/bath'
        })
      } else if (route.name === 'Body') {
        crumbs.push({
          title: 'Тело',
          path: '/body'
        })
      } else if (route.name === 'Hair') {
        crumbs.push({
          title: 'Волосы',
          path: '/hair'
        })
      } else if (route.name === 'Men') {
        crumbs.push({
          title: 'Для него',
          path: '/men'
        })
      } else if (route.name === 'Gifts') {
        crumbs.push({
          title: 'Подарки',
          path: '/gifts'
        })
      } else if (route.name === 'Series') {
        crumbs.push({
          title: 'Серии',
          path: '/series'
        })
      } else if (route.name === 'Accessories') {
        crumbs.push({
          title: 'Аксессуары',
          path: '/accessories'
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
      }
      
      // Для страниц товаров можно добавить дополнительную логику
      if (route.params.id) {
        // Здесь можно получить название товара по ID
        const productName = getProductName(route.params.id)
        crumbs.push({
          title: productName,
          path: route.path
        })
      }
      
      return crumbs
    })
    
    const getProductName = (id) => {
      // Заглушка - в реальном приложении здесь будет запрос к API или store
      const products = {
        '1': 'Крем для лица',
        '2': 'Шампунь для волос',
        '3': 'Гель для душа'
      }
      return products[id] || `Товар #${id}`
    }
    
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