<script setup lang="ts">
import { useScrollStore } from '@/store/scroll.store'

const scrollStore = useScrollStore();

const smoothScrollToElement = () => {
  const elementToScroll = scrollStore.elementToScroll;
  if (elementToScroll) {
    const scrollPosition = elementToScroll.offsetTop - 100; // Отступ сверху
    window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
  }
};

onMounted(() => {
  // You can also watch the state if necessary
  // console.log('Element to scroll:', scrollStore.elementToScroll);
});
</script>

<template>
  <div class="hero">
    <div class="main">
      <div class="bg">
        <h1 class="h1">API-интерфейс для&nbsp;Wildberries</h1>
        <ul class="tags">
          <li>товары</li>
          <li>продавцы</li>
          <li>бренды</li>
        </ul>
        <div class="text">
          Неофициальный API интерфейс с актуальными, а так же историческими
          данными для ваших систем аналитики, телеграм ботов и других целей
        </div>
        <button class="btn btn-pink-white link-choose ready" @click="smoothScrollToElement">
          <div><span>В</span><span>ы</span><span>б</span><span>р</span><span>а</span><span>т</span><span>ь</span><span> </span><span>т</span><span>а</span><span>р</span><span>и</span><span>ф</span></div><div><span>В</span><span>ы</span><span>б</span><span>р</span><span>а</span><span>т</span><span>ь</span><span> </span><span>т</span><span>а</span><span>р</span><span>и</span><span>ф</span></div></button>
      </div>
    </div>
    <!-- end .main-->
    <h2 class="hidden-title">Наши преимущества</h2>
    <ul class="list">
      <li class="girl"></li>
      <li class="el">
        <div class="pic"><img src="/img/icons/search-data.svg" alt="" /></div>
        <h3 class="h3">
          Обогащение<br />
          данных
        </h3>
        <div class="text">
          Мы не просто собираем данные, а так же постоянно ищем пути обогащения
          их дополнительной информацией
        </div>
      </li>
      <!-- end .el-->
      <li class="el">
        <div class="pic"><img src="/img/icons/wallet.svg" alt="" /></div>
        <h3 class="h3">
          Комфортные<br />
          тарифы
        </h3>
        <div class="text">
          Каждый сможет подобрать тариф по своим потребностям, а если нет —
          напишите нам и мы сделаем предложением
        </div>
      </li>
      <!-- end .el-->
      <li class="el">
        <div class="pic"><img src="/img/icons/folder.svg" alt="" /></div>
        <h3 class="h3">
          Эксперты<br />
          парсинга
        </h3>
        <div class="text">
          Наша компания занимается промышленным парсингом несколько лет
        </div>
      </li>
      <!-- end .el-->
      <li class="el">
        <div class="pic"><img src="/img/icons/calendar.svg" alt="" /></div>
        <h3 class="h3">
          Ежедневная<br />
          актуализация
        </h3>
        <div class="text">
          Ежедневно мы обновляем данные по товарам, продавцам и брендам,
          чтобы предоставить их вам
        </div>
      </li>
      <!-- end .el-->
    </ul>
    <!-- end .list-->
  </div>
</template>
