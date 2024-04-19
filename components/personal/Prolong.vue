<script setup lang="ts">
let swiperInstance: any | null = null;
const isFirstSlide = ref(false);
const isLastSlide = ref(false);
const onSwiperInit = (swiper: any) => {
  swiperInstance = swiper;

  // Watch for changes in swiperInstance.realIndex
  watch(() => swiperInstance?.realIndex, (newValue) => {
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

                    <SwiperSlide>
                        <div>1 месяц за 3500 ₽</div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div>3 месяца за 9 500 ₽</div>
                        <div class="small blue">выгода 100₽</div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div>6 месяцев за 18 900 ₽</div>
                        <div class="small blue">выгода 2100₽</div>
                    </SwiperSlide>

                    <SwiperSlide>
                        <div>12 месяцев за 38 500 ₽</div>
                        <div class="small blue">выгода 3500₽</div>
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

            <div class="btn btn-pink-black btn-big"><span>Продлить тариф</span></div>
        </div>
        <!-- end .row-->
    </div>
    <!-- end .prolong-->
</template>