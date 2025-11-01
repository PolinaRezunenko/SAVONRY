<template>
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
</template>

<script>
export default {
  name: 'Interested'
}
</script>

<style scoped>

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

</style>