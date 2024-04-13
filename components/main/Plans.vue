<script setup lang="ts">
import { ref } from 'vue'
import { usePlansStore } from '~/store/plans.store'
// import { Plan } from '@/types/plan'

interface Plan {
    $id: string
    name: string
    desc: string
    price: number
    price_year: number
    icon: string
  }

// Реактивная переменная для хранения данных планов
const plansStore = usePlansStore()

// Геттер для получения данных о планах
// const plans = ref<Plan[]>(plansStore.getPlans)

// Реактивная переменная для отображения цен по годам
const pricesByYear = ref(false)

// Функция для изменения режима отображения цен
const changePriceBy = () => {
  pricesByYear.value = !pricesByYear.value
}
</script>



<template>
  <div class="plans" :class="{yearly : pricesByYear}" id="mainPlans">
    <div class="head">
      <h2 class="h2">Тарифы</h2>
      <div class="trigger">
        <div @click="changePriceBy">Ежемесячно</div>
        <div @click="changePriceBy">Ежегодно</div>
      </div>
      <div class="text">
        В каждом тарифе находится ограниченное количество запросов за месяц
      </div>
    </div>
    <!-- end .head-->
    <div class="list" v-if="plansStore.getPlans.length !== 0">
      <Swiper
      :slides-per-view="'auto'"
      :loop="true"
      :effect="'creative'"
      :autoplay="{
        delay: 8000,
        disableOnInteraction: true,
      }"
      :creative-effect="{
        prev: {
          shadow: false,
          translate: ['-20%', 0, -1],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      }"
      class="plans-slider"
    >
      <SwiperSlide v-for="slide in plansStore.getPlans" :key="slide.$id">
        <div class="bg">
          <div class="pic"><img :src="slide.icon" alt="" /></div>
          <h3 class="h3">{{ slide.name }}</h3>
          <div class="text">
            {{ slide.desc }}<span
              class="pic-help"
              data-tippy-content="Неофициальный API интерфейс с актуальными, а так же историческими данными для ваших систем."
            ></span>
          </div>
          <!-- end .text-->
          <div class="price">
            <div class="per-month" v-show="!pricesByYear"><strong>{{ slide.price }} ₽</strong>/мес</div>
            <div class="per-year" v-show="pricesByYear"><strong>{{slide.price_year}} ₽</strong>/год</div>
          </div>
          <!-- end .price-->
        </div>
        <!-- end .bg-->
        <a class="btn btn-pink-black" href="/registration"><span>выбрать</span></a>
      </SwiperSlide>
    </Swiper>
      <!-- end .plans-slider-->
    </div>
    <!-- end .list-->
  </div>
</template>
