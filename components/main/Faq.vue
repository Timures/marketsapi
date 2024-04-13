<script setup lang="ts">

import { Collapse } from 'vue-collapsed'
import { useFaqStore } from '@/store/faq.store.ts'

interface Faq {
    $id: string
    title: string
    text: string
    isOpen: boolean
  }

  const faqStore = useFaqStore()


const handleAccordion = (item: Faq) => {
  item.isOpen = !item.isOpen
}

/**
 * For individual control you might use:
 *
 * function handleMultiple(index) {
 *   questions[index].isExpanded = !questions[index].isExpanded
 * }
 */
</script>

<template>
  <div class="faq">
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
    <div class="list" v-if="faqStore.getFaq.length > 0">

  <div class="el" v-for="(item, index) in faqStore.getFaq" :key="item.$id">
    <h3 class="h3"  @click="handleAccordion(item)">
         {{ item.title }}<span
            class="btn btn-pink-black"
           
          >
            <svg width="24" height="24">
              <use xlink:href="/img/sprite.svg#info"></use>
            </svg>
            <svg width="24" height="24">
              <use xlink:href="/img/sprite.svg#close"></use>
            </svg>
          </span>
        </h3>
  
    
    <Collapse :when="item.isOpen" class="v-collapse">
      <div class="inner">
          <div class="text" v-html="item.text"></div>
      </div>
       <!-- end .inner-->
    </Collapse>
  </div>
  <!-- end .el-->
</div>
    <!-- end .list-->
    </div>
</template>

<style>
.v-collapse {
  transition: height var(--vc-auto-duration) cubic-bezier(0.33, 1, 0.68, 1);
}
</style>