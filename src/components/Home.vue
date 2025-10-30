<template>
  <div class="banner">
    <div class="banner-content">
      <!-- Твой контент баннера -->
      <div class="new-badge">Новинка!</div>
      <h1>Встречайте новую серию</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.banner {
  background-image: url('@/assets/images/banner-home.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 500px;
  padding: 60px 360px;
  display: flex;
  align-items: center;
}

.banner-content {
  /* Стили для твоего контента */
  color: white;
}
</style>



<!-- <template>
  <div class="banner_photo">
    <h1>Заголовок</h1>
    <p>Текст баннера</p>
  </div>
</template>

<style scoped>
.banner_photo {
  background-image: url('./assets/images/banner-home.png');
  background-size: cover;      /* Растянуть на весь блок */
  background-position: center; /* Центрировать */
  background-repeat: no-repeat; /* Не повторять */
  width: 100%;
  height: 400px;
}
</style> -->


