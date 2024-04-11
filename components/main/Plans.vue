<script setup></script>

<template>
  <div class="plans">
    <div class="head">
      <h2 class="h2">Тарифы</h2>
      <div class="trigger">
        <div>Ежемесячно</div>
        <div>Ежегодно</div>
      </div>
      <div class="text">
        В каждом тарифе находится ограниченное количество запросов за месяц
      </div>
    </div>
    <!-- end .head-->
    <div class="list">
      <div class="swiper plans-slider">
        <ul class="swiper-wrapper">
          <li class="swiper-slide">
            <div class="bg">
              <div class="pic"><img src="/img/plans/1.svg" alt="" /></div>
              <h3 class="h3">Free</h3>
              <div class="text">
                До 10 запросов в сутки<span
                  class="pic-help"
                  data-tippy-content="Неофициальный API интерфейс с актуальными, а так же историческими данными для ваших систем."
                ></span>
              </div>
              <!-- end .text-->
              <div class="price">
                <div class="per-month"><strong>0 ₽</strong>/мес</div>
                <div class="per-year"><strong>0 ₽</strong>/год</div>
              </div>
              <!-- end .price-->
            </div>
            <!-- end .bg-->
            <a class="btn btn-pink-black" href="#"><span>выбрать</span></a>
          </li>
          <!-- end .swiper-slide-->
          <li class="swiper-slide">
            <div class="bg">
              <div class="pic"><img src="/img/plans/2.svg" alt="" /></div>
              <h3 class="h3">Basic</h3>
              <div class="text">
                1000 запросов в сутки<span
                  class="pic-help"
                  data-tippy-content="Неофициальный API интерфейс с актуальными, а так же историческими данными для ваших систем."
                ></span>
              </div>
              <!-- end .text-->
              <div class="price">
                <div class="per-month"><strong>3500 ₽</strong>/мес</div>
                <div class="per-year"><strong>42 000 ₽</strong>/год</div>
              </div>
              <!-- end .price-->
            </div>
            <!-- end .bg-->
            <a class="btn btn-pink-black" href="#"><span>выбрать</span></a>
          </li>
          <!-- end .swiper-slide-->
          <li class="swiper-slide">
            <div class="bg">
              <div class="pic"><img src="/img/plans/3.svg" alt="" /></div>
              <h3 class="h3">Pro</h3>
              <div class="text">
                3000 запросов в сутки<span
                  class="pic-help"
                  data-tippy-content="Неофициальный API интерфейс с актуальными, а так же историческими данными для ваших систем."
                ></span>
              </div>
              <!-- end .text-->
              <div class="price">
                <div class="per-month"><strong>7500 ₽</strong>/мес</div>
                <div class="per-year"><strong>90 000 ₽</strong>/год</div>
              </div>
              <!-- end .price-->
            </div>
            <!-- end .bg-->
            <a class="btn btn-pink-black" href="#"><span>выбрать</span></a>
          </li>
          <!-- end .swiper-slide-->
          <li class="swiper-slide">
            <div class="bg">
              <div class="pic"><img src="/img/plans/4.svg" alt="" /></div>
              <h3 class="h3">Mega</h3>
              <div class="text">
                12 000 запросов в сутки<span
                  class="pic-help"
                  data-tippy-content="Неофициальный API интерфейс с актуальными, а так же историческими данными для ваших систем."
                ></span>
              </div>
              <!-- end .text-->
              <div class="price">
                <div class="per-month"><strong>21 000 ₽</strong>/мес</div>
                <div class="per-year"><strong>252 000 ₽</strong>/год</div>
              </div>
              <!-- end .price-->
            </div>
            <!-- end .bg-->
            <a class="btn btn-pink-black" href="#"><span>выбрать</span></a>
          </li>
          <!-- end .swiper-slide-->
          <li class="swiper-slide">
            <div class="bg">
              <div class="pic"><img src="/img/plans/5.svg" alt="" /></div>
              <h3 class="h3">Ultra</h3>
              <div class="text">
                120 000 запросов в сутки<span
                  class="pic-help"
                  data-tippy-content="Неофициальный API интерфейс с актуальными, а так же историческими данными для ваших систем."
                ></span>
              </div>
              <!-- end .text-->
              <div class="price">
                <div class="per-month"><strong>75 000 ₽</strong>/мес</div>
                <div class="per-year"><strong>900 000 ₽</strong>/год</div>
              </div>
              <!-- end .price-->
            </div>
            <!-- end .bg-->
            <a class="btn btn-pink-black" href="#"><span>выбрать</span></a>
          </li>
          <!-- end .swiper-slide-->
        </ul>
        <!-- end .swiper-wrapper-->
      </div>
      <!-- end .plans-slider-->
    </div>
    <!-- end .list-->
  </div>
</template>
