<template>
  <section>      
    <Breadcrumbs />
    <div class="container">
      <div class="cart-content">
        <h1>Корзина</h1>
        
        <div v-if="cartItems.length === 0" class="empty-cart">
          <p>Ваша корзина пуста</p>
          <RouterLink to="/" class="continue-shopping">Продолжить покупки</RouterLink>
        </div>

        <div v-else class="cart-items">
          <div class="cart-item" v-for="item in cartItems" :key="item.id">
            <RouterLink 
              :to="{ name: 'ProductDetail', params: { id: item.product_id } }"
              class="item-image-link"
            >
              <img 
                :src="item.products?.image_url || '/images/placeholder.jpg'" 
                :alt="item.products?.name" 
                class="item-image"
                @error="handleImageError"
              >
            </RouterLink>
            <div class="item-details">
              <RouterLink 
                :to="{ name: 'ProductDetail', params: { id: item.product_id } }"
                class="item-name-link"
              >
                <h3>{{ item.products?.name || 'Товар' }}</h3>
              </RouterLink>
              <p class="item-price">{{ item.products?.price || 0 }} ₽</p>
            </div>
            <div class="quantity-controls">
              <button 
                @click="updateQuantity(item.id, item.quantity - 1)"
                :disabled="item.quantity <= 1"
              >-</button>
              <span>{{ item.quantity }}</span>
              <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
            </div>
            <div class="item-total">
              {{ calculateItemTotal(item) }} ₽
            </div>
            <button @click="removeFromCart(item.id)" class="remove-btn">×</button>
          </div>

          <div class="cart-summary">
            <div class="total">
              Итого: {{ totalPrice }} ₽
            </div>
            <button 
              @click="handleCheckout" 
              class="checkout-btn"
              :disabled="isCheckingOut"
            >
              {{ isCheckingOut ? 'Оформление...' : 'Оформить заказ' }}
            </button>
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
import { onMounted, ref } from 'vue'
import Breadcrumbs from './Breadcrumbs.vue'
import ProductHits from '@/components/ProductHits.vue'

export default {
  name: 'Cart',
  components: {
    Breadcrumbs,
    ProductHits
  },
  setup() {
    const { 
      cartItems, 
      totalPrice, 
      handleUpdateQuantity, 
      handleRemoveFromCart,
      loadCartItems 
    } = useCart()
    
    const isCheckingOut = ref(false)

    const handleImageError = (event) => {
      event.target.src = '@/assets/images/placeholder.jpg'
    }

    const calculateItemTotal = (item) => {
      const price = item.products?.price || 0
      const quantity = item.quantity || 1
      return (price * quantity).toFixed(2)
    }

    const updateQuantity = async (itemId, newQuantity) => {
      await handleUpdateQuantity(itemId, newQuantity)
    }

    const removeFromCart = async (itemId) => {
      await handleRemoveFromCart(itemId)
    }

    // Симуляция отправки письма о заказе
    const sendOrderEmail = (orderDetails) => {
      const orderNumber = Math.floor(100000 + Math.random() * 900000);
      const orderDate = new Date().toLocaleString('ru-RU');
      
      let itemsList = '';
      orderDetails.items.forEach(item => {
        itemsList += `• ${item.name} - ${item.quantity} шт. × ${item.price} ₽ = ${item.total} ₽\n`;
      });
      
      const emailContent = `
        Уважаемый покупатель!
        
        Ваш заказ №${orderNumber} успешно оформлен.
        
        Дата заказа: ${orderDate}
        
        Состав заказа:
        ${itemsList}
        
        Итого к оплате: ${orderDetails.total} ₽
        
        Статус заказа: Обрабатывается
        
        Спасибо за ваш заказ!
        Мы свяжемся с вами в ближайшее время для уточнения деталей.
        
        С уважением,
        Команда магазина
      `;
      
      console.log('=== ПИСЬМО О ЗАКАЗЕ ===');
      console.log('Заказ отправлен на email клиента');
      console.log('Номер заказа:', orderNumber);
      console.log('Содержимое письма:', emailContent);
      
      return orderNumber;
    }

    // Обработка оформления заказа
    const handleCheckout = async () => {
      if (cartItems.value.length === 0) {
        alert('Корзина пуста');
        return;
      }
      
      isCheckingOut.value = true;
      
      try {
        // Создаем детали заказа
        const orderDetails = {
          items: cartItems.value.map(item => ({
            name: item.products?.name || 'Товар',
            quantity: item.quantity,
            price: item.products?.price || 0,
            total: calculateItemTotal(item)
          })),
          total: totalPrice.value,
          date: new Date().toISOString()
        };
        
        // Симуляция обработки заказа
        await new Promise(resolve => setTimeout(resolve, 1000)); // Имитация задержки
        
        // Отправляем "письмо" о заказе
        const orderNumber = sendOrderEmail(orderDetails);
        
        // Показываем сообщение пользователю
        alert(`Заказ №${orderNumber} успешно оформлен!\n\nДетали заказа отправлены на ваш email.\n\nСпасибо за покупку!`);
        
        // Очищаем корзину после оформления
        cartItems.value.forEach(async item => {
          await handleRemoveFromCart(item.id);
        });
        
        // Перезагружаем корзину
        await loadCartItems();
        
      } catch (error) {
        console.error('Ошибка при оформлении заказа:', error);
        alert('Произошла ошибка при оформлении заказа. Попробуйте еще раз.');
      } finally {
        isCheckingOut.value = false;
      }
    }

    onMounted(() => {
      loadCartItems();
    })

    return {
      cartItems,
      totalPrice,
      isCheckingOut,
      updateQuantity,
      removeFromCart,
      handleCheckout,
      handleImageError,
      calculateItemTotal
    }
  }
}
</script>

<style scoped>
.cart-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.empty-cart {
  text-align: center;
  padding: 60px 0;
}

.empty-cart p {
  font-size: 18px;
  color: #666;
  margin-bottom: 20px;
}

.continue-shopping {
  color: #000;
  text-decoration: none;
  font-weight: bold;
  padding: 10px 20px;
  border: 2px solid #000;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.continue-shopping:hover {
  background-color: #000;
  color: white;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  gap: 20px;
  transition: all 0.3s ease;
}

.item-image-link {
  display: block;
  flex-shrink: 0;
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  transition: transform 0.3s ease;
}

.item-image:hover {
  transform: scale(1.05);
}

.item-details {
  flex: 1;
  min-width: 0;
}

.item-name-link {
  text-decoration: none;
  color: inherit;
}

.item-details h3 {
  margin: 0 0 10px 0;
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.3s ease;
}

.item-details h3:hover {
  color: #666;
}

.item-price {
  font-weight: bold;
  color: #000;
  margin: 0;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.quantity-controls button {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 3px;
  transition: all 0.2s ease;
}

.quantity-controls button:hover:not(:disabled) {
  background-color: #f5f5f5;
}

.quantity-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-controls span {
  min-width: 30px;
  text-align: center;
  font-weight: bold;
}

.item-total {
  font-weight: bold;
  font-size: 18px;
  min-width: 100px;
  text-align: right;
  flex-shrink: 0;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #999;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: color 0.2s ease;
}

.remove-btn:hover {
  color: #ff4444;
}

.cart-summary {
  margin-top: 30px;
  text-align: right;
  padding-top: 20px;
  border-top: 2px solid #000;
}

.total {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.checkout-btn {
  background-color: #000;
  color: white;
  padding: 15px 40px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.checkout-btn:hover:not(:disabled) {
  background-color: #333;
}

.checkout-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>