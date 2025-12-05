<template>
  <section class="subscription-section">
    <div class="container">
        <div class="subscription-content">
            <!-- Левая часть - форма -->
            <div class="form-container">
                <h1 class="main-title">Узнавайте первыми о наших акциях, розыгрышах и новостях</h1>
                
                <form class="subscription-form">
                    <div class="input-group">
                        <input type="email" class="email-input" placeholder="E-mail" required>
                        <button type="submit" class="subscribe-btn">Подписаться</button>
                    </div>
                </form>
                
                <p class="privacy-text">
                    Нажимая подписаться, вы соглашаетесь на обработку персональных данных
                </p>
              
            </div>
            
            <!-- Правая часть - фотография -->
            <div class="image-container">
                <div class="image-wrapper">
                    <img src="@/assets/images/home/scrab.png" alt="скраб" class="product-image">
                </div>
            </div>
        </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Banner'
}
</script>

<style scoped>

.subscription-section {
  background: linear-gradient(188.7deg, #F0F0F0 6.29%, #F4F4F4 93.02%);
  height: 336px;
  position: relative;
  overflow: hidden;
}

.container{
  max-width: 1920px;
  padding: 0px;
  margin: 0 auto;
  height: 100%;
}

.subscription-content {
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
  z-index: 2;
}

/* Левая часть - форма */
.form-container {
  padding: 47px 0 47px 361px;
  width: 792px;
  height: 243px;
  background: transparent;
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.main-title {
  color: #000000;
  margin-bottom: 20px;
  font-family: "Raleway-SemiBold";
  font-weight: 600;
  font-size: 48px;
  line-height: 1.2;
}

.subscription-form {
  margin-bottom: 15px;
}

.input-group {
  display: flex;
  border-radius: 50px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  width: 568px;
}

.email-input {
  flex: 1;
  padding: 18px 25px;
  border: none;
  outline: none;
  font-size: 16px;
  background: white;
  border-right: 1px solid #eee;
  min-width: 0;
}

.email-input::placeholder {
  color: #999;
}

.subscribe-btn {
  background-color: #000000; 
  color: #ffffff;
  width: 196px;
  height: 52px;
  border-radius: 10px;
  padding: 16px 32px;
  font-family: "Mulish-Regular-400";
  font-weight: 400;
  font-size: 15px;
  flex-shrink: 0;
}

.subscribe-btn:hover {
  background-color:  #323232;
  color: white;
}

.privacy-text {
  font-size: 12px;
  font-family: "Mulish-Light-300";
  width: 568px;
}

/* Правая часть - фотография */
.image-container {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: calc(100% - 792px - 361px + 200px); /* Увеличил ширину и убрал отступы */
  display: flex;
  align-items: flex-end;
  justify-content: flex-end; /* Выравнивание по правому краю */
  z-index: 1;
  padding-right: 0; /* Убираем правый отступ */
}

.image-wrapper {
  position: relative;
  text-align: center;
  height: 100%;
  display: flex;
  align-items: flex-end;
  margin-right: -50px; /* Сдвигаем картинку еще правее */
}

.product-image {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  object-position: bottom;
  display: block;
  transition: transform 0.3s ease;
}

.product-image:hover {
  transform: scale(1.02);
}

/* Адаптивность */
@media (max-width: 1400px) {
  .form-container {
    padding-left: 200px;
    padding-right: 20px;
    width: 700px;
  }
  
  .image-container {
    width: calc(100% - 700px - 200px + 150px);
  }
  
  .main-title {
    font-size: 36px;
  }
  
  .input-group {
    width: 500px;
  }
  
  .privacy-text {
    width: 500px;
  }
  
  .image-wrapper {
    margin-right: -30px;
  }
}

@media (max-width: 1200px) {
  .form-container {
    padding-left: 150px;
    width: 650px;
  }
  
  .image-container {
    width: calc(100% - 650px - 150px + 120px);
  }
  
  .main-title {
    font-size: 32px;
  }
  
  .input-group {
    width: 480px;
  }
  
  .privacy-text {
    width: 480px;
  }
  
  .image-wrapper {
    margin-right: -20px;
  }
}

@media (max-width: 1024px) {
  .form-container {
    padding-left: 100px;
    width: 550px;
    height: auto;
    min-height: 243px;
  }
  
  .image-container {
    width: calc(100% - 550px - 100px + 100px);
  }
  
  .main-title {
    font-size: 28px;
  }
  
  .input-group {
    width: 450px;
  }
  
  .privacy-text {
    width: 450px;
  }
  
  .image-wrapper {
    margin-right: -15px;
  }
}

@media (max-width: 900px) {
  .form-container {
    padding-left: 80px;
    width: 500px;
  }
  
  .image-container {
    width: calc(100% - 500px - 80px + 80px);
  }
  
  .main-title {
    font-size: 26px;
  }
  
  .input-group {
    width: 400px;
  }
  
  .privacy-text {
    width: 400px;
  }
  
  .image-wrapper {
    margin-right: -10px;
  }
}

@media (max-width: 768px) {
  .subscription-section {
    height: auto;
    min-height: 500px;
  }
  
  .subscription-content {
    flex-direction: column;
    gap: 40px;
  }

  .form-container {
    padding: 40px 20px 20px;
    order: 1;
    width: 100%;
    height: auto;
  }

  .image-container {
    position: relative;
    order: 2;
    width: 100%;
    height: 300px;
    justify-content: center;
    align-items: center;
    padding-right: 0;
  }

  .image-wrapper {
    align-items: center;
    margin-right: 0;
  }

  .product-image {
    max-height: 250px;
    object-position: center;
  }

  .main-title {
    font-size: 28px;
    margin-bottom: 20px;
    line-height: 1.3;
  }

  .input-group {
    flex-direction: column;
    border-radius: 15px;
    width: 100%;
    max-width: 400px;
  }

  .email-input {
    border-right: none;
    border-bottom: 1px solid #eee;
    border-radius: 15px 15px 0 0;
  }

  .subscribe-btn {
    border-radius: 0 0 15px 15px;
    width: 100%;
  }
  
  .privacy-text {
    width: 100%;
    max-width: 400px;
  }
}

@media (max-width: 480px) {
  .subscription-section {
    padding: 40px 15px;
  }

  .main-title {
    font-size: 24px;
    line-height: 1.3;
  }

  .brand-name {
    font-size: 24px;
  }

  .product-name {
    font-size: 16px;
  }
}
</style>