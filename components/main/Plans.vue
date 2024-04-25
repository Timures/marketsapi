<script setup lang="ts">
import { ref } from 'vue'
import { usePlansStore } from '~/store/plans.store'
import { useScrollStore } from '@/store/scroll.store'
import { useTippy } from 'vue-tippy'


/** Так как скролл вызывается в другом компоненте, используется store  */
const elementToScroll = ref<HTMLElement | null>(null);
const scrollStore = useScrollStore();

onMounted(() => {
  elementToScroll.value = document.getElementById('elementToScroll');
  if (elementToScroll.value) {
    scrollStore.setElementToScroll(elementToScroll.value);
  }
});
// Реактивная переменная для хранения данных планов
const plansStore = usePlansStore()

// Геттер для получения данных о планах
// const plans = ref<Plan[]>(plansStore.getPlans)
// Функция для вывода пробелов между тысячами, свыше 10 000
const numberWithSpaces = (num: number) => {
  return num > 10000 ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : num;
}
// Реактивная переменная для отображения цен по годам
const pricesByYear = ref(false)

// Функция для изменения режима отображения цен
const changePriceBy = () => {
  pricesByYear.value = !pricesByYear.value
}

const requestsText = 'Неофициальный API интерфейс c актуальными, a так же историческими данными для ваших систем.'
</script>



<template>
  <div class="plans" :class="{ yearly: pricesByYear }" id="mainPlans">
    <div class="head" id="elementToScroll">
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
      <Swiper :slides-per-view="'auto'" :loop="true" :effect="'creative'" :autoplay="{
    delay: 8000,
    disableOnInteraction: true,
  }" :creative-effect="{
    prev: {
      shadow: false,
      translate: ['-20%', 0, -1],
    },
    next: {
      translate: ['100%', 0, 0],
    },
  }" class="plans-slider">
        <SwiperSlide v-for="slide in plansStore.getPlans" :key="slide.$id">
          <div class="bg">
            <div class="pic"><img :src="slide.icon" alt="" /></div>
            <h3 class="h3">{{ slide.name }}</h3>
            <div class="text">
             <span v-if="slide.price === 0">До</span> {{ numberWithSpaces(slide.request_a_day) }} запросов в сутки
              <span class="pic-help" v-tippy="{
                  content: requestsText,
                  theme: 'light',
                  delay: 100,
                  arrow: true,
                }"></span>
            </div>
            <!-- end .text-->
            <div class="price" v-if="!slide.is_promo">
              <div class="per-month" v-show="!pricesByYear"><strong>{{ numberWithSpaces(slide.price) }} ₽</strong>/мес</div>
              <div class="per-year" v-show="pricesByYear"><strong>{{ numberWithSpaces(slide.price_year) }} ₽</strong>/год</div>
            </div>
            <!-- end .price-->
            <div class="price beta" v-if="slide.is_promo">
              <div class="small">{{ slide.promo_text }}</div>

              <template v-if="slide.price === 0">
                <div class="per-month" v-show="!pricesByYear"><strong>{{ slide.price }} ₽</strong>/мес</div>
                <div class="per-year" v-show="pricesByYear"><strong>{{ slide.price_year }} ₽</strong>/год</div>
                <div class="big">Бесплатно</div>
              </template>
              <template v-else>
                <div class="per-month" v-show="!pricesByYear"><strong>{{ numberWithSpaces(slide.price) }} ₽</strong>/мес</div>
                <del class="big per-month" v-show="!pricesByYear">{{ numberWithSpaces(slide.promo_price) }} ₽</del>
                <div class="per-year" v-show="pricesByYear"><strong>{{ numberWithSpaces(slide.price_year) }} ₽</strong>/год</div>
                <del class="big per-year" v-show="pricesByYear">{{ numberWithSpaces(slide.promo_price_year) }} ₽</del>
              </template>
            </div>
            <!-- end .bg-->
            <NuxtLink class="btn btn-pink-black" to="/registration"><span>выбрать</span></NuxtLink>
          </div>
        </SwiperSlide>
      </Swiper>
      <!-- end .plans-slider-->
    </div>
    <!-- end .list-->
  </div>
</template>
