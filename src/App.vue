<template>
    <!-- Верхний хедер -->
     
    <header class="top-header">
      
      <nav class="top-nav">
        <div class="top-nav-left">
          <RouterLink :to="{ name: 'Promotions'}">АКЦИИ</RouterLink>
          <RouterLink :to="{ name: 'NewProducts'}">НОВИНКИ</RouterLink>
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
            <RouterLink :to="{ name: 'Cart'}" class="profile_icon">
              <img src="./assets/icons/cart.svg" alt="корзина">
            </RouterLink>
        </div>
      </nav>
    </header>
    
    <!-- Основной хедер -->
    <header class="main-header">
      <nav class="main-nav">
        <div class="nav-links">
          <RouterLink :to="{ name: 'Face'}">ЛИЦО</RouterLink>
          <RouterLink :to="{ name: 'Catalog1'}">ВАННА И ДУШ</RouterLink>
          <RouterLink :to="{ name: 'Body'}">ТЕЛО</RouterLink>
          <RouterLink :to="{ name: 'Hair'}">ВОЛОСЫ</RouterLink>
          <RouterLink :to="{ name: 'Men'}">ДЛЯ НЕГО</RouterLink>
          <RouterLink :to="{ name: 'Gifts'}">ПОДАРКИ</RouterLink>
          <RouterLink :to="{ name: 'Series'}">СЕРИИ</RouterLink>
          <RouterLink :to="{ name: 'Accessories '}">АКСЕССУАРЫ</RouterLink>
        </div>
      </nav>
    </header>
    
    

    <!-- активная страница -->
  <RouterView />  

  <footer class="footer">
    <p></p>
  </footer>
  </template>

<script>
export default {
  name: 'App'
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
  color: rgb(0, 0, 0);
  align-items: center;
  padding: 40px 0px;
  font-family: Mulish-Regular-400;
  font-weight: 400;
  font-size: 16px;
  gap: 33px;
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

.main-header {
  background-color: rgb(0, 0, 0);
  border-bottom: 1px solid #eaeaea;
  height: 52px;
}

.main-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  
}


.nav-links {
  display: flex;
  font-family: Mulish-Regular-400;
  font-weight: 400;
  font-size: 16px ;
  color: white;
  padding: 16px 0;
  gap: 83px;
}

 
  
</style>