import { ref, computed } from 'vue'
import { 
  addToCart, 
  getCartCount, 
  getCartItems, 
  updateCartItemQuantity, 
  removeFromCart 
} from '@/utils/cart'

// Глобальные реактивные переменные ВНЕ функции
const globalCartCount = ref(0)
const globalCartItems = ref([])
const globalLoadingItems = ref({})

export function useCart() {
  // Загрузка количества товаров в корзине
  const loadCartCount = async () => {
    try {
      globalCartCount.value = await getCartCount()
    } catch (error) {
      console.error('Ошибка загрузки количества корзины:', error)
    }
  }

  // Загрузка товаров корзины
  const loadCartItems = async () => {
    try {
      const items = await getCartItems()
      globalCartItems.value = items
      updateCartCountFromItems()
    } catch (error) {
      console.error('Ошибка загрузки корзины:', error)
    }
  }

  // Обновление счетчика на основе локальных данных
  const updateCartCountFromItems = () => {
    globalCartCount.value = globalCartItems.value.reduce((total, item) => {
      return total + (item.quantity || 0)
    }, 0)
  }

  // Добавление товара в корзину
  const handleAddToCart = async (product) => {
    try {
      globalLoadingItems.value[product.id] = true
      
      const result = await addToCart(product.id)
      
      if (result.success) {
        // Немедленно увеличиваем счетчик
        globalCartCount.value += 1
        await loadCartItems()
      } else {
        alert('Ошибка при добавлении в корзину')
      }
    } catch (error) {
      console.error('Ошибка:', error)
      alert('Ошибка при добавлении в корзину')
    } finally {
      globalLoadingItems.value[product.id] = false
    }
  }

  // Получение количества конкретного товара в корзине
  const getProductQuantity = (productId) => {
    const cartItem = globalCartItems.value.find(item => item.product_id === productId)
    return cartItem ? cartItem.quantity : 0
  }

  // Проверка, загружается ли конкретный товар
  const isProductLoading = (productId) => {
    return globalLoadingItems.value[productId] || false
  }

  // Обновление количества
  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) return
    
    try {
      const oldItem = globalCartItems.value.find(item => item.id === itemId)
      const oldQuantity = oldItem ? oldItem.quantity : 0
      
      const result = await updateCartItemQuantity(itemId, newQuantity)
      if (result.success) {
        // Обновляем локально
        const itemIndex = globalCartItems.value.findIndex(item => item.id === itemId)
        if (itemIndex !== -1) {
          globalCartItems.value[itemIndex].quantity = newQuantity
        }
        
        // Обновляем счетчик
        const quantityDiff = newQuantity - oldQuantity
        globalCartCount.value += quantityDiff
      }
    } catch (error) {
      console.error('Ошибка обновления количества:', error)
    }
  }

  // Удаление из корзины
  const handleRemoveFromCart = async (itemId) => {
    try {
      const itemToRemove = globalCartItems.value.find(item => item.id === itemId)
      const quantityToRemove = itemToRemove ? itemToRemove.quantity : 0
      
      const result = await removeFromCart(itemId)
      if (result.success) {
        // Удаляем локально
        globalCartItems.value = globalCartItems.value.filter(item => item.id !== itemId)
        // Обновляем счетчик
        globalCartCount.value -= quantityToRemove
      }
    } catch (error) {
      console.error('Ошибка удаления из корзины:', error)
    }
  }

  // Общая стоимость
  const totalPrice = computed(() => {
    return globalCartItems.value.reduce((total, item) => {
      const price = item.products?.price || 0
      const quantity = item.quantity || 0
      return total + (price * quantity)
    }, 0).toFixed(2)
  })

  return {
    // Реактивные данные - возвращаем глобальные переменные
    cartCount: globalCartCount,
    cartItems: computed(() => globalCartItems.value),
    totalPrice,
    
    // Методы
    loadCartCount,
    loadCartItems,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveFromCart,
    getProductQuantity,
    isProductLoading
  }
}

