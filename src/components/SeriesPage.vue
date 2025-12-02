<template>
  <section>
    <div class="container">
      <Breadcrumbs />
      <div class="series-content">
        <h1>Серии продукции</h1>
        <p class="series-subtitle">Откройте для себя уникальные ароматические коллекции</p>
        
        <div class="series-grid">
          <div 
            v-for="seriesItem in series" 
            :key="seriesItem.id" 
            class="series-card"
          >
            <RouterLink 
              :to="{ name: 'SeriesDetail', params: { id: seriesItem.id } }"
              class="series-card-link"
            >
              <div class="series-image">
                <img 
                  :src="seriesItem.image_url || '/images/series-placeholder.jpg'" 
                  :alt="seriesItem.name"
                  @error="handleImageError"
                >
              </div>
              <div class="series-info">
                <h3>{{ seriesItem.name }}</h3>
                <p>{{ seriesItem.description }}</p>
                <span class="series-products-count">
                  {{ getSeriesProductsCount(seriesItem.id) }} товаров
                </span>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { supabase } from '@/lib/supabase'
import { ref, onMounted } from 'vue'
import Breadcrumbs from './Breadcrumbs.vue'

export default {
  name: 'SeriesPage',
  components: {
    Breadcrumbs
  },
  setup() {
    const series = ref([])
    const seriesProducts = ref({})

    const loadSeries = async () => {
      try {
        const { data, error } = await supabase
          .from('series')
          .select('*')
          .order('name')

        if (error) throw error
        series.value = data || []
        
        // Загружаем количество товаров для каждой серии
        await loadSeriesProductsCount()
      } catch (error) {
        console.error('Ошибка загрузки серий:', error)
      }
    }

    const loadSeriesProductsCount = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('series_id')
          .not('series_id', 'is', null)

        if (error) throw error
        
        // Считаем товары по сериям
        const counts = {}
        data.forEach(product => {
          counts[product.series_id] = (counts[product.series_id] || 0) + 1
        })
        seriesProducts.value = counts
      } catch (error) {
        console.error('Ошибка подсчета товаров:', error)
      }
    }

    const getSeriesProductsCount = (seriesId) => {
      return seriesProducts.value[seriesId] || 0
    }

    const handleImageError = (event) => {
      event.target.src = '@/assets/images/series-placeholder.jpg'
    }

    onMounted(() => {
      loadSeries()
    })

    return {
      series,
      getSeriesProductsCount,
      handleImageError
    }
  }
}
</script>

<!-- SeriesPage.vue - исправленные стили для 3 карточек в ряд -->
<style scoped>
.series-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.series-content h1 {
  font-family: "Raleway-SemiBold";
  font-weight: 600;
  font-size: 48px;
  color: #000;
  text-align: center;
  margin-bottom: 16px;
}

.series-subtitle {
  font-family: "Mulish-Light-300";
  font-weight: 300;
  font-size: 18px;
  color: #666;
  text-align: center;
  margin-bottom: 64px;
}

.series-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 карточки в ряд */
  gap: 40px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}

.series-card {
  background-color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.series-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.series-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.series-image {
  height: 250px;
  overflow: hidden;
}

.series-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.series-card:hover .series-image img {
  transform: scale(1.05);
}

.series-info {
  padding: 24px;
}

.series-info h3 {
  font-family: "Mulish-Regular-400";
  font-weight: 600;
  font-size: 20px;
  color: #000;
  margin-bottom: 12px;
}

.series-info p {
  font-family: "Mulish-Light-300";
  font-weight: 300;
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 16px;
}

.series-products-count {
  font-family: "Mulish-Regular-400";
  font-weight: 400;
  font-size: 14px;
  color: #999;
}

/* Адаптивность для SeriesPage */
@media (max-width: 1024px) {
  .series-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 карточки в ряд на планшетах */
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .series-content h1 {
    font-size: 36px;
  }
  
  .series-grid {
    grid-template-columns: 1fr; /* 1 карточка в ряд на мобильных */
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .series-content {
    padding: 20px 10px;
  }
  
  .series-content h1 {
    font-size: 28px;
  }
}
</style>