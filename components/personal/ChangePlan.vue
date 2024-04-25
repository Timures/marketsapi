<script setup lang="ts">
import { useAuthStore } from '#imports';
import { usePlansStore } from '~/store/plans.store'
// Реактивная переменная для хранения данных планов
const plansStore = usePlansStore()
const authStore = useAuthStore()

const props = defineProps<{ onClose?: () => void }>();

const currentLevel = authStore.getCurrentTariffLevel
/** Вывод тарифов выше уровня текущего */
const plansToLevelUp = ref()
/** Вывод конвертации дней */

const convertPlanDays = (tariffLevel: number | undefined): number => {
    if (tariffLevel === undefined) {
        console.error('Уровень тарифа не определен');
        return 0;
    }

    const oldDays = authStore.getKeyExpired;
    const pro = 2;
    const mega = 3;
    const ultra = 5;

    if (tariffLevel === 1 || tariffLevel === 2) {
        return oldDays; // Нет конвертации
    }
    if (tariffLevel === 3) {
        // it's Pro plan, 1 to 2 days
        return Math.round(oldDays / pro);
    }
    if (tariffLevel === 4) {
        // it's Mega plan, 1 to 3 days
        return Math.round(oldDays / mega);
    }
    if (tariffLevel === 5) {
        // it's Ultra plan, 1 to 5 days
        return Math.round(oldDays / ultra);
    }

    console.error('Неверный уровень тарифа');
    return 0;
};

// Функция для изменения тарифа пользователя
const changeTariff = (tariffId: string, convertDays: number) => {
    const changeData = {tariff:tariffId, key_days:convertDays}
    authStore.patchProfileData(changeData)
   
//   console.log('change plan', tariffId);
  // Emit close event to close the modal after successful password change
props.onClose && props.onClose();
  
};


// Реактивная переменная для отображения цен по годам
const pricesByYear = ref(false)

// Функция для изменения режима отображения цен
const changePriceBy = () => {
    pricesByYear.value = !pricesByYear.value
    
}

// Функция для вывода пробелов между тысячами, свыше 10 000
const numberWithSpaces = (num: number) => {
  return num > 10000 ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : num;
}

const formatDays = (days: number): string => {
  if (days === 1 || (days % 10 === 1 && days % 100 !== 11)) {
    return `${days} день`;
  } else if (
    (days > 1 && days < 5) ||
    ((days % 10 > 1 && days % 10 < 5) && (days % 100 < 10 || days % 100 > 20))
  ) {
    return `${days} дня`;
  } else {
    return `${days} дней`;
  }
}

onBeforeMount(()=> {
    plansToLevelUp.value = plansStore.fetchPlansByLevel(currentLevel)
})
</script>

<template>
    <div class="modal-head plans-modal">
        <div>
            <h2 class="h3">Сменить тариф</h2>
        <div class="text">Ваш текущий тариф: {{  authStore.getCurrentTariffName }} с {{  authStore.getCurrentTariffUpdated }}</div>
        </div>
        <div class="plans-head" :class="{yearly : pricesByYear}">
            <button class="btn btn-grey" v-show="pricesByYear" @click="changePriceBy">
            <span>Ежемесячно</span>
        </button>
            <button class="btn btn-grey" v-show="!pricesByYear" @click="changePriceBy">
            <span>Ежегодно</span>
        </button>
        </div>
    </div>
    <!-- end .modal-head-->
    <div class="plans" :class="{yearly : pricesByYear}">
        
        <div class="list">
            <Swiper :slides-per-view="'auto'" :loop="false" :effect="'creative'" :autoplay="{
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
                <SwiperSlide v-for="slide in plansToLevelUp" :key="slide.$id">
                    <div class="bg">
                        <div class="pic">
                            <img :src="slide.icon" alt="" />
                        </div>
                        <h3 class="h3">{{ slide.name }}</h3>
                        <div class="text">
                            <span v-if="slide.price === 0">До</span> {{ numberWithSpaces(slide.request_a_day) }} запросов в сутки
                            <span class="pic-help"
                                data-tippy-content="Неофициальный API интерфейс с актуальными, а так же историческими данными для ваших систем."></span>
                        </div>
                        <!-- end .text-->
                        <div class="price" v-if="!slide.is_promo">
                            <div class="per-month" v-show="!pricesByYear"><strong>{{ numberWithSpaces(slide.price) }} ₽</strong>/мес</div>
                            <div class="per-year" v-show="pricesByYear"><strong>{{numberWithSpaces(slide.price_year)}} ₽</strong>/год</div>
                        </div>
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
                        <!-- end .price-->
                        <div class="info d-inline">Оставшихся <strong>{{ formatDays(authStore.getKeyExpired) }}</strong> по тарифу {{ authStore.getCurrentTariff.name }} будут пересчитаны в <strong>{{ formatDays(convertPlanDays(slide.tariff_level)) }}</strong> по тарифу {{ slide.name }}.</div>
                    </div>
                    <!-- end .bg-->
                    <button class="btn btn-pink-black" @click="changeTariff(slide.$id, convertPlanDays(slide.tariff_level))"><span>выбрать</span></button>
                </SwiperSlide>
            </Swiper>

            <!-- end .plans-slider-->
        </div>
        <!-- end .list-->
    </div>
    <!-- end .plans-->
</template>

<style lang="scss" scoped>
.d-inline {
    display: inline-block!important;
}
.plans-modal {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>