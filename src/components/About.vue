<template>
  <main>
    <div class="container">
      <!-- Хлебные крошки перед баннером -->
      <div class="breadcrumbs-wrapper">
        <Breadcrumbs />
      </div>
      <div class="image_content">
        <img src="@/assets/images/aboutus/banner.png" alt="банер" >
      </div>
    </div>
  </main>

  <section>
    <div class="container">
      <div class="about_content">
        <div class="about_text">
          <h1>О SAVONRY</h1>
          <p>Производство косметики «SAVONRY» базируется на принципах арома — и фитотерапии, при строгом соблюдении рецептур и технологий.</p>
          <p>Здоровье, безопасность и благополучие наших клиентов — главные приоритеты для нас. Мы стремимся предоставить продукты высокого качества, использование которых доставит вам удовольствие.</p>     
          <p>Поэтому мы уделяем особое внимание оценке ингредиентов, тщательно выбирая те, которые мы включаем в наши продукты, и те, которые мы исключаем.</p>
          <p>Мы не испытываем продукцию на животных, а пробуем её сами.</p>
        </div>
        <div class="about_img">
          <img src="@/assets/images/aboutus/img1.png" alt="1">
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="about_content2">
        <div class="about_img2">
          <img src="@/assets/images/aboutus/img2.png" alt="2">
        </div>
        <div class="about_text2">
          <h2>«Наша косметика всегда свежая, потому что мы производим её только под заказ»</h2>
          <p>SAVONRY</p>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="princ_title">
        <h3>Наши принципы</h3>
      </div>
      <div class="princ_content">
        <div class="princ_img">
            <img src="@/assets/images/aboutus/img3.png" alt="3">
        </div>
        <div class="princ_text">
          <p>Мы делаем все возможное, чтобы гарантировать, что каждый продукт, который мы разрабатываем, соответствует строгим стандартам безопасности, эффективности и стабильности.</p>
          <p>Мы используем современные активные ингредиенты, такие как эмоленты, комплексы с кислотами, витаминные активы и другие.</p>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="container">
      <div class="princ2_content">
        <div class="princ2_text">
          <p>Мы тестируем каждый продукт на всех этапах производства, чтобы убедиться, что он соответствует стандартам качества.</p>
          <p>Проверяем уровень pH, термо- и коллоидную стабильность, используем метод ускоренного старения, тестируем взаимодействие тары и продукта.</p>
          <p>Готовые продукты тестируем на добровольной фокус-группе.</p>
        
        </div>
        <div class="princ2_img">
            <img src="@/assets/images/aboutus/img4.png" alt="4">
        </div>
      </div>
    </div>
  </section>

<section>
    <div class="container">
      <div class="princ3_content">
        <div class="princ3_img">
            <img src="@/assets/images/aboutus/img5.png" alt="5">
        </div>
        <div class="princ3_text">
          <p>Мы делаем все возможное, чтобы гарантировать, что каждый продукт, который мы разрабатываем, соответствует строгим стандартам безопасности, эффективности и стабильности.</p>
          <p>Мы используем современные активные ингредиенты, такие как эмоленты, комплексы с кислотами, витаминные активы и другие.</p>
        </div>
      </div>
    </div>
  </section>

<section>
    <div class="container">
      <div class="princ4_content">
        <div class="princ4_text">
          <p>Точно так же, как мы уделяем большое внимание процессу оценки ингредиентов, рецептуры, мы тщательно отбираем поставщиков сырья и упаковки, следим чтобы их продукция соответствовала нашим стандартам качества.</p>
          <p>Все сырье проходит жесткий входной контроль на соответствие паспортным данным и стандартам.</p>
        
        </div>
        <div class="princ4_img">
            <img src="@/assets/images/aboutus/img6.png" alt="6">
        </div>
      </div>
    </div>
  </section>
  <section>
    <div class="container">
      <div class="princ5_content">
        <div class="princ5_img">
            <img src="@/assets/images/aboutus/img7.png" alt="7">
        </div>
        <div class="princ5_text">
          <p>Мы хотим, чтобы наши клиенты точно знали, что входит в состав наших продуктов.</p>
          <p>Для этого мы последовательно перечисляем ингредиенты в соответствии с установленными стандартами, и не используем общих фраз.</p>
        </div>
      </div>
    </div>
  </section>
  <section>
    <div class="container">
      <div class="future_content">
        <div class="future_title">
          <h3>Мы заботимся о вашем будущем</h3>
        </div>
        <div class="future_cards">
          <img src="@/assets/images/aboutus/1.png" alt="1">
          <img src="@/assets/images/aboutus/2.png" alt="2">
          <img src="@/assets/images/aboutus/3.png" alt="3">
        </div>
      </div>
    </div>
  </section>


</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs.vue'

export default {
  name: 'About',
 components: {

    Breadcrumbs
 }
}
</script>

<style scoped>



.container{
  max-width: 1920px;
  padding: 0px;
  margin: 0 auto;
}

.image_content{
  max-width: 1200px;
  padding: 95px 360px;
}

.about_content{
  display: flex;
  justify-content: space-between;
  gap: 133px;
  margin: 0 360px  110px;
}


.about_text {
  width: 590px;
  height: 264px;
}

 .about_img {
  width: 384px;
  height: 365px;
  border-radius: 10px;
  margin-top: 28px;

}

.about_text h1{
  font-family: "Raleway-SemiBold";
  font-weight: 600;
  font-style: SemiBold;
  font-size: 48px;
  color: #000;
  margin-bottom: 64px;
}

.about_text p{
  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
  color: #000000;
  margin-bottom: 16px;
  font-family:"Mulish-Light-300";
  font-weight: 300;

}


.about_content2 {
  display: flex;
  justify-content: space-between;
  gap: 121px;
  margin-bottom: 110px;
  margin: 0 360px;
  

}


.about_text2 {
  width: 387px;
  height: 168px;
  padding: 43px 0 0;
}

 .about_img2 {
  width: 384px;
  height: 365px;
  border-radius: 10px;
  margin-top: 28px;
  align-items: start;

}

.about_text2 h2{
  font-family: "Mulish-Regular-400";
  color: #000;
  margin-bottom: 24px;
  font-weight: 400;
  font-style: Regular;
  font-size: 24px;
}

.about_text2 p{
  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
  color: #817E79;
  font-family:"Mulish-Light-300";
  font-weight: 300;

}

.princ_content,
.princ2_content, 
.princ3_content,
.princ4_content,
.princ5_content{
  display: flex;
  justify-content: space-between;
  gap: 120px;
  margin: 0 360px  110px;
}


.princ_text {
  width: 694px;
  height: 234px;
  padding: 76px 0;
}

 .princ_img {
  width: 386px;
  height: 386px;
  border-radius: 10px;

}

.princ_title{
  font-family: "Raleway-SemiBold";
  font-weight: 600;
  font-style: SemiBold;
  font-size: 48px;
  color: #000;
  margin: 0 360px 64px ;
}

.princ_text p{
  font-family: "Mulish-Regular-400";
  color: #000;
  margin-bottom: 24px;
  font-weight: 400;
  font-style: Regular;
  font-size: 24px;
}

/* 
.princ2_content{
  display: flex;
  justify-content: space-between;
  gap: 120px;
  margin: 0 360px  110px;
} */


.princ2_text {
  width: 694px;
  height: 288px;
  padding: 49px 0;
}

 .princ2_img {
  width: 386px;
  height: 386px;
  border-radius: 10px;

}

.princ2_text p{
  font-family: "Mulish-Regular-400";
  color: #000;
  margin-bottom: 24px;
  font-weight: 400;
  font-style: Regular;
  font-size: 24px;

}


/* .princ3_content{
  display: flex;
  justify-content: space-between;
  gap: 120px;
  margin: 0 360px  110px;
} */


.princ3_text {
  width: 694px;
  height: 234px;
  padding: 76px 0;
}

 .princ3_img {
  width: 386px;
  height: 386px;
  border-radius: 10px;

}

.princ3_text p{
  font-family: "Mulish-Regular-400";
  color: #000;
  margin-bottom: 24px;
  font-weight: 400;
  font-style: Regular;
  font-size: 24px;
}

/* .princ4_content{
  display: flex;
  justify-content: space-between;
  gap: 120px;
  margin: 0 360px  110px;
} */


.princ4_text {
  width: 694px;
  height: 204px;
  padding: 91px 0;
}

 .princ4_img {
  width: 386px;
  height: 386px;
  border-radius: 10px;

}

.princ4_text p{
  font-family: "Mulish-Regular-400";
  color: #000;
  margin-bottom: 24px;
  font-weight: 400;
  font-style: Regular;
  font-size: 24px;

}

/* .princ5_content{
  display: flex;
  justify-content: space-between;
  gap: 120px;
  margin: 0 360px  110px;
} */


.princ5_text {
  width: 694px;
  height: 174px;
  padding: 106px 0;
}

 .princ5_img {
  width: 386px;
  height: 386px;
  border-radius: 10px;

}

.princ5_text p{
  font-family: "Mulish-Regular-400";
  color: #000;
  margin-bottom: 24px;
  font-weight: 400;
  font-style: Regular;
  font-size: 24px;
}

.future_content{
  margin: 0 360px  110px;
}

.future_title{
  font-family: "Raleway-SemiBold";
  font-weight: 600;
  font-style: SemiBold;
  font-size: 48px;
  color: #000;
  margin: 0 0 64px ;
}

.future_cards  {
  display: flex;
  gap: 20px; /* Расстояние между картинками */
  justify-content: center; /* Выравнивание по центру */
  }






</style>