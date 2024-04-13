<script setup lang="ts">
import { ref } from 'vue'
import { useFaqStore } from '@/store/faq.store.ts'

interface Faq {
    $id: string
    name: string
    text: string
    isOpen: boolean
  }

  const faqStore = useFaqStore()

  const toggleFaq = (item: Faq) => {
    item.isOpen = !item.isOpen
  }

  const setMaxHeight = (el:any) => {
      el.style.setProperty(
        '--max-height',
        el.scrollHeight + 'px'
      );
    }

</script>

<template>
  <div class="faq">
    <CommonAccordion />
    <div class="head">
      <h2 class="h2">
        Частые<br />
        вопросы
      </h2>
      <div class="text">
        <div>
          Не нашли ответ на свой вопрос?<br />
          Задайте его в поддержке по email:
        </div>
        <a class="btn btn-border-black" href="mailto:teh@marketsapi.ru"
          ><span>teh@marketsapi.ru</span></a
        >
      </div>
    </div>
    <!-- end .head-->
    <div class="list">
      <div class="el" v-for="item in faqStore.getFaq" :key="item.$id" :class="{open: item.isOpen}">
        <h3 class="h3">
         {{ item.title }}<span
            class="btn btn-pink-black"
            @click="toggleFaq(item)"
          >
            <svg width="24" height="24">
              <use xlink:href="/img/sprite.svg#info"></use>
            </svg>
            <svg width="24" height="24">
              <use xlink:href="/img/sprite.svg#close"></use>
            </svg>
          </span>
        </h3>
        <transition name="slide" @enter="setMaxHeight">
          <div class="inner" >
          
            <div class="text" v-if="item.isOpen" v-html="item.text"></div>
  
         
        </div>
      </transition>
        <!-- end .inner-->
      </div>
      <!-- end .el-->
    </div>
    <!-- end .list-->
  </div>
</template>

<style lang="scss">
.slide-enter-active, .slide-leave-active {
  transition: max-height 0.3s cubic-bezier(0, 1, 0.5, 1); /* настройте длительность и эффект анимации */
}
.slide-enter, .slide-leave-to {
   max-height: var(--max-height, 1000px); /* начальное состояние скрытия элемента */
  overflow: hidden; /* скрываем содержимое, которое выходит за пределы высоты */
}
  </style>