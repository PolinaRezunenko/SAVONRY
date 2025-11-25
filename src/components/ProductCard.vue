<template>
  <div class="product-card">
    <RouterLink 
      :to="{ name: 'ProductDetail', params: { id: product.id } }"
      class="product-link"
    >
      <div class="product-image">
        <img :src="product.image_url" :alt="product.name">
        <div v-if="product.is_new" class="badge new">NEW</div>
        <div v-if="product.is_promotion" class="badge sale">SALE</div>
      </div>
      <div class="product-info">
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-description">{{ product.short_description }}</p>
        <div class="price-section">
          <span class="current-price">{{ product.price }} ₽</span>
          <span v-if="product.old_price" class="old-price">{{ product.old_price }} ₽</span>
        </div>
      </div>
    </RouterLink>
    <button 
      class="add-to-cart-btn"
      @click="$emit('add-to-cart', product)"
    >
      В корзину
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  emits: ['add-to-cart']
}
</script>