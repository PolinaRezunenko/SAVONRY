<template>
  <main>
    <div class="container">
      <div class="banner">
        <div class="banner-content">
            <h1>Новинка!</h1>
            <p>Встречай новую коллекцию шариков для ванны</p>
            <button class="banner-btn">Подробнее</button>
        </div>
      </div>
    </div>
  </main>

  <section>
    <div class="container">
      <div class="newproducts_content">
        <h2>Новинки</h2>
        <div class="newproducts_cards">
          <div class="newproducts_card">
            <div class="newproducts_card_top">
              <img src="@/assets/images/newprod1.png" alt="1" class="newproducts_card_image">
              <p class="newproducts_card_name">Набор Ванильный эспрессо (уход за телом)</p>
            </div>
            <div class="newproducts_card_bot">
              <div class="newproducts_card_price">740 ₽</div>
              <button class="newproducts_card_button">В корзину</button>
            </div>
          </div>
          <div class="newproducts_card">
            <div class="newproducts_card_top">
              <img src="@/assets/images/newprod2.png" alt="2" class="newproducts_card_image">
              <p class="newproducts_card_name">Набор Ванильный эспрессо (уход за телом)</p>
            </div>
            <div class="newproducts_card_bot">
              <div class="newproducts_card_price">740 ₽</div>
              <button class="newproducts_card_button">В корзину</button>
            </div>
          </div>
          <div class="newproducts_card">
            <div class="newproducts_card_top">
              <img src="@/assets/images/newprod3.png" alt="3" class="newproducts_card_image">
              <p class="newproducts_card_name">Набор Ванильный эспрессо (уход за телом)</p>
            </div>
            <div class="newproducts_card_bot">
              <div class="newproducts_card_price">740 ₽</div>
              <button class="newproducts_card_button">В корзину</button>
            </div>
          </div>
          <div class="newproducts_card">
            <div class="newproducts_card_top">
              <img src="@/assets/images/newprod4.png" alt="4" class="newproducts_card_image">
              <p class="newproducts_card_name">Набор Ванильный эспрессо (уход за телом)</p>
            </div>
            <div class="newproducts_card_bot">
              <div class="newproducts_card_price">740 ₽</div>
              <button class="newproducts_card_button">В корзину</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="image_content">
        <img src="@/assets/images/advantages.png" alt="инфа" >
      </div>
    </div>
  </section>


  <section>
    <div class="container">
      <div class="about_title">
        <h4>О нас</h4>
      </div>
      <div class="about_content">
        <div class="about_img">
            <img src="@/assets/images/woman.png" alt="Женщина">
        </div>
        <div class="about_text">
            <h5>Производство косметики «SAVONRY» базируется на принципах арома — и фитотерапии, при строгом соблюдении рецептур и технологий.</h5>
            <p>Здоровье, безопасность и благополучие наших клиентов — главные приоритеты для нас. Мы стремимся предоставить продукты высокого качества, использование которых доставит вам удовольствие.</p>
            <button class="about_button">Подробнее о нас</button>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.banner {
  background-image:linear-gradient( #00000026) , url('@/assets/images/banner-home.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  max-width: 1920px;
}

.banner-content {
  color: white;
  padding: 158px 678px;
}

.banner-content h1{
  font-family: "Raleway-SemiBold";
  font-weight: 600;
  font-size: 64px;
  text-align: center;
  padding: 16px 138;
}

.banner-content p{
font-family: "Mulish-Regular-400";
font-weight: 400;
font-size: 24px;
}

.banner-btn {
  width: 151px;
  height: 52px;
  border-radius: 10px;
  padding: 16px 32px;
  background-color: black;
  color: white;
  font-family: "Mulish-Regular-400";
  font-weight: 400;
  font-size: 16px;
  margin:40px 206.5px 0 ;
  cursor: pointer;
  transition: all 0.3s ease;
}

.banner-btn:hover {
  background-color:  #323232;
  color: white;

}

.container{
  max-width: 1920px;
  padding: 0px;
  margin: 0 auto;
}

.newproducts_content h2{
  color: black;
  font-family: "Raleway-SemiBold";
  font-weight: 600;
  font-size: 48px;
  padding: 120px 868px 64px;
}



.newproducts_cards {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto ;
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}

.newproducts_card {
  background-color: #ffffff;
  display: flex;
  flex-direction: column; /*содержимое карточки размещяем друг за другов в колонку(сверху вниз) */
  flex-basis: 270px;  /*задаем размер карточкам */
}

.newproducts_card_top{
  height: 350px;
  margin-bottom: 18px;
}

.newproducts_card_image {
  width: 100%;
  height: 286px;
  width: 270px;
  margin-bottom: 16px;
}

.newproducts_card_bot{
  display: flex;
  width: 270px;
  height: 44px;
}

.newproducts_card_name {
  color: #000000;
  margin-bottom: 10px;
  font-family: "Mulish-Regular-400";
  font-weight: 300;
  font-style: Light;
  font-size: 16px;
  line-height: 150%;


}

.newproducts_card_price {
  color: #000000;
  font-size: 24px;
  width: 142px;
  height: 20px;
  padding: 12px 0;
}

.newproducts_card_button {
  width: 142px;
  height: 44px;
  padding: 32px 10px;
  background-color: transparent;
  border: 1px solid #000000;
  color: #000000;
  font-family:"Mulish-Light-300";
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 10px;
  border-radius: 5px;

}

.newproducts_card_button:hover {
  background-color: #000000;
  color: #F4F6F5;
}

.image_content{
  max-width: 1200px;
  padding: 120px 360px;
}

.about_content{
  display: flex;
  align-items: center;
  gap: 122px;
}

.about_title{
  font-family: "Raleway-SemiBold";
  font-weight: 600;
  font-size: 48px;
  color: #000;
  text-align: center;
  padding: 120px 0 51px;
}

.about_text {
  width: 488px;
  height: 332px;
}

 .about_img {
  padding-left: 328px;
  width: 622px;
  height: 526px;
}

.about_text h5{
  font-size: 24px;
  font-weight: 400; /* чтобы был размер шрифта medium, а не bold*/
  line-height: 100%;/* межстрочный интервал*/
  color: #000000;
  margin-bottom: 32px; /* отступ снизу фразы*/
  font-family: "Mulish-Regular-400";
}

.about_text p{
  font-size: 16px;  font-weight: 500; /* чтобы был размер шрифта medium, а не bold*/
  line-height: 150%;/* межстрочный интервал*/
  color: #000000;
  margin-bottom: 32px; /* отступ снизу фразы*/
  font-family:"Mulish-Light-300";
  font-weight: 300;

}

.about_button{
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

.about_button:hover {
  background-color:  #323232;
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


