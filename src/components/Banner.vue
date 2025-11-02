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
                    <img src="@/assets/advantages.png" alt="скраб" class="product-image">
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
  padding: 80px 20px;

}

.container{
  max-width: 1920px;
  padding: 0px;
  margin: 0 auto;
}

.subscription-content {
display: flex;
gap: 60px;
align-items: center;
}

/* Левая часть - форма */
.form-container {
padding: 40px;
}

.main-title {
color: #000000;
margin-bottom: 30px;
font-family: "Raleway-SemiBold";
font-weight: 600;
font-size: 48px;
}

.subscription-form {
margin-bottom: 20px;
}

.input-group {
display: flex;
border-radius: 50px;
overflow: hidden;
box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
margin-bottom: 15px;
}

.email-input {
flex: 1;
padding: 18px 25px;
border: none;
outline: none;
font-size: 16px;
background: white;
border-right: 1px solid #eee;
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
}

.subscribe-btn:hover {
  background-color:  #323232;
  color: white;
}

.privacy-text {
  font-size: 12px;
  margin-bottom: 30px;
  font-family: "Mulish-Light-300";
}


/* Правая часть - фотография */
.image-container {
display: flex;
justify-content: center;
align-items: center;
}

.image-wrapper {
position: relative;
text-align: center;
}

.product-image {
max-width: 100%;
height: auto;
border-radius: 20px;
box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
transition: transform 0.3s ease;
}

.product-image:hover {
transform: scale(1.02);
}

.image-caption {
margin-top: 20px;
}

.product-name {
font-size: 18px;
color: #7f8c8d;
font-style: italic;
}

/* Адаптивность */
@media (max-width: 768px) {
.subscription-content {
    grid-template-columns: 1fr;
    gap: 40px;
}

.form-container {
    padding: 20px;
    order: 2;
}

.image-container {
    order: 1;
}

.main-title {
    font-size: 26px;
}

.input-group {
    flex-direction: column;
    border-radius: 15px;
}

.email-input {
    border-right: none;
    border-bottom: 1px solid #eee;
    border-radius: 15px 15px 0 0;
}

.subscribe-btn {
    border-radius: 0 0 15px 15px;
}
}

@media (max-width: 480px) {
.subscription-section {
    padding: 40px 15px;
}

.main-title {
    font-size: 22px;
}

.brand-name {
    font-size: 24px;
}

.product-name {
    font-size: 16px;
}
}
</style>