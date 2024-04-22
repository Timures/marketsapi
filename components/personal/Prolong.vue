<script setup lang="ts">
import { useAuthStore } from "@/store/auth.store";
import { useProlongStore } from '@/store/prolong.store';

const authStore = useAuthStore()


let swiperInstance: any | null = null;
const isFirstSlide = ref(false);
const isLastSlide = ref(false);
const onSwiperInit = (swiper: any) => {
    swiperInstance = swiper;

    // Watch for changes in swiperInstance.realIndex
    watch(() => swiperInstance?.realIndex, (newValue) => {
        activeSlideIndex.value = newValue;
        isFirstSlide.value = newValue === 0;
        isLastSlide.value = newValue === swiperInstance.slides.length - 1;
    });
};

const nextSlide = () => {
    if (swiperInstance && !isLastSlide.value) {
        swiperInstance.slideNext();
    }
};

const prevSlide = () => {
    if (swiperInstance && !isFirstSlide.value) {
        swiperInstance.slidePrev();
    }
};



const prolongStore = useProlongStore()

const prolongPricesOptions = computed(() => {
    return prolongStore.getProlongPrice
})
// Переменная для хранения индекса активного слайда
const activeSlideIndex = ref(0);

const handleProlongPlan = () => {
    // Получаем информацию о выбранном тарифе по индексу активного слайда
    const selectedTariff = prolongPricesOptions.value[activeSlideIndex.value];
    const daysVolume = authStore.getKeyExpired + (selectedTariff.month * 30); // 44 + (1 * 30) // текущее значение дней + тариф умножаемый на 30, 1 месяц = 30 дней, 3 месяца = 90 дней
    const prolongData = { key_days: daysVolume }
    authStore.patchProfileData(prolongData)
    // console.log('selectedProlongValue ', prolongData);
}

const monthText = (month: number) => {
    // Определение формы слова "месяц" в зависимости от числительного
    if (month === 1 || (month % 10 === 1 && month % 100 !== 11)) {
        return `${month} месяц`;
    } else if (
        (month > 1 && month < 5) ||
        ((month % 10 > 1 && month % 10 < 5) && (month % 100 < 10 || month % 100 > 20))
    ) {
        return `${month} месяца`;
    } else {
        return `${month} месяцев`;
    }
}
</script>

<template>
    <div class="block prolong">
        <h3 class="h3">Продлить тариф</h3>
        <div class="row">
            <div class="wrap">
                <Swiper :slides-per-view="1" :effect="'creative'" :autoplay="{
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
                }" @swiper="onSwiperInit" :navigation="{
                    prevEl: '.prolong-slider-minus',
                    nextEl: '.prolong-slider-plus',
                }" class="prolong-slider">
                    <SwiperSlide v-for="(option, option_index) in prolongPricesOptions" :key="option_index">
                        <div>{{ monthText(option.month) }} за {{ new Intl.NumberFormat("ru-RU").format(option.price) }} ₽</div>
                        <div v-if="option.profit > 0" class="small blue">{{ option.profit }}₽</div>
                    </SwiperSlide>
                </Swiper>

                <!-- end .prolong-slider-->
                <button class="btn prolong-slider-minus" :disabled="isFirstSlide" @click="prevSlide">
                    <svg width="32" height="32">
                        <use xlink:href="/img/sprite.svg#remove"></use>
                    </svg>
                </button>
                <button class="btn prolong-slider-plus" :disabled="isLastSlide" @click="nextSlide">
                    <svg width="32" height="32">
                        <use xlink:href="/img/sprite.svg#add"></use>
                    </svg>
                </button>
            </div>
            <!-- end .wrap-->

            <button @click="handleProlongPlan" class="btn btn-pink-black btn-big"><span>Продлить тариф</span></button>
        </div>
        <!-- end .row-->
    </div>
    <!-- end .prolong-->
</template>

<style scoped>
.prolong-label {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

/* Скрываем кружок радиокнопки */
input[type="radio"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    opacity: 0;
    width: 1px;
    height: 1px;
    position: absolute;
    left: 0;
    top: 0;
}
</style>