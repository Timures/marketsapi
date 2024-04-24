<script setup lang="ts">
import { useServersStore } from '@/store/servers.store'
import { ref, onMounted, watch } from 'vue';
import { Collapse } from 'vue-collapsed'
import { useTippy } from 'vue-tippy'

import type { MainParams } from '@/types/servers'
// Получите доступ к хранилищу серверов
const serversStore = useServersStore();
// Определите интерфейс для объекта ServerOption
interface ServerOption {
  name: string;
  value: string;
}
/** Выбор GET / POST */
const selectedTab = ref('get')
const changeSelectedTab = (tab: string) => {
  selectedTab.value = tab
  serversStore.selectMethodsByType(tab)
  selectedLangOption.value = serversStore.getLangsData[0]
};
/** Выбор параметров */
const mainParamsStatus = ref(true)
const additionalParamsStatus = ref(true)

const openMainParams = () => {
  mainParamsStatus.value == false ? mainParamsStatus.value = true : mainParamsStatus.value = false
}

const openAdditionalParams = () => {
  additionalParamsStatus.value == false ? additionalParamsStatus.value = true : additionalParamsStatus.value = false
}

const paramsAdditionalOption = ref('3613644237542745')

const paramsMainSelectedOption = ref<MainParams | null>()
const handleParamsMainSelected = () => {
  if (paramsMainSelectedOption.value) {
    serversStore.selectParamsByValue(paramsMainSelectedOption.value.value)
  }

  // console.log('handleParamsMainSelected',paramsMainSelectedOption.value);

}

/** Выбор repsonse */
const selectedResponseTab = ref('code')
const changeResponseSelectedTab = (tab: string) => {
  selectedResponseTab.value = tab
};

/** Выбор языка */
const selectedLangOption = ref()

const handleSelectLang = () => {
  // console.log('handle select lang', selectedLangOption.value);
  serversStore.selectMethodsByType(selectedLangOption.value?.type)
}

/** Выбор статус ответа */
const selectedResponseOption = ref()
const handleSelectResponse = () => {
  // console.log('selectedResponseOption ', selectedResponseOption.value)
  serversStore.selectResponse(selectedResponseOption.value)
}
/** Test Endpoint */
const isResultTestEndpoint = ref(false)
const handleTestEndpoint = () => {
  // console.log('test endpoint');
  if (selectedTab.value === 'get') {
    fetchGetData()
    isResultTestEndpoint.value = true
  }
  if (selectedTab.value === 'post') {
    fetchPostData()
    isResultTestEndpoint.value = true
  }
}

// Define constants for the API details
const API_HOST = paramsMainSelectedOption.value?.value; // https://dummyjson.com/products/1
const API_SKU = paramsAdditionalOption.value;

const testEndpointResultData = ref(null)
// Function to make a GET request
const fetchGetData = async () => {
  try {
    console.log('paramsMainSelectedOption.value?.value ', paramsMainSelectedOption.value?.value)
    const response = await fetch(` https://${paramsMainSelectedOption.value?.value}?sku=${API_SKU}`);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    testEndpointResultData.value = data
    console.log('testEndpointResultData.value ', data, testEndpointResultData.value)
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

// Function to make a POST request
const fetchPostData = async () => {
  try {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers as needed
      },
      // body: JSON.stringify({ url: url }),
    };
    const response = await fetch(`https://${paramsMainSelectedOption.value?.value}`, options);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    testEndpointResultData.value = data
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};


/** Выбор сервера */
// Создайте ссылку для хранения выбранного сервера
const serverSelectedOption = ref<ServerOption | null>(serversStore.getNameValueData);

const handleChangeSelectServer = () => {
  // console.log('change server', serverSelectedOption.value);
  if (serverSelectedOption.value) {
    serversStore.selectServerByValue(serverSelectedOption.value.value)
  }
}

/** COPY TO CLIPBOARD */
// Create a ref to store the copy status message
const copyStatus = ref<boolean | null>(null);

// Function to copy text to clipboard
const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      copyStatus.value = true;
      // Hide the copy status after a short delay (e.g., 3 seconds)
      setTimeout(() => {
        copyStatus.value = null;
      }, 1500);
    })
    .catch((error) => {
      console.error('Error copying text:', error);
      // copyStatus.value = 'Ошибка копирования.';
    });
};

// test
// const { swiper } = useSwiper();

let swiperInstance: any | null = null;
let currentSlideIndex = ref(0);

const onSwiperInit = (swiper: any) => {
  swiperInstance = swiper;
};

const onSlideChange = (swiperInstance: any) => {
  if (swiperInstance && swiperInstance.activeIndex !== undefined) {
    currentSlideIndex.value = swiperInstance.activeIndex;
  } else {
    console.error('Ошибка: swiperInstance или его свойство activeIndex не определены.');
  }
};

const nextSlide = () => {
  if (swiperInstance) {
    // console.log('value nextSlide swiperInstance', swiperInstance)
    swiperInstance.slideNext();
  }
};

const goToFirstSlide = () => {
  if (swiperInstance) {
    swiperInstance.slideTo(0); // Или swiperInstance.slideToLoop(0), если хотите циклическую навигацию
  }
};

const testEndpointAndNext = () => {
  handleTestEndpoint()
  nextSlide()
}

const copyText = 'Код скопирован'
const copyRef = ref<HTMLButtonElement | null>(null);

const tableCode = ref<HTMLElement | null>(null);

// Загрузите данные и установите начальное значение после монтирования компонента
onMounted(async () => {
  await serversStore.fetchServers(); // Загрузка данных из хранилища
  const defaultServer = serversStore.getNameValueData; // Получите данные из хранилища
  if (defaultServer !== null) {
    serverSelectedOption.value = defaultServer; // Установите начальное значение
    paramsMainSelectedOption.value = serversStore.getParamsMainData[0]
    selectedTab.value = serversStore.getMethods[0].type
    selectedLangOption.value = serversStore.getLangsData[0]
    selectedResponseOption.value = serversStore.getSelectedResponses[0]

  } else {
    console.error('Ошибка при загрузке данных из сервера.');
  }

  // -- copy
  if (copyRef.value) {
    useTippy(copyRef.value, {
      theme: 'light',
      content: copyText,
      // show and hide delay are 100ms
      delay: 100,
      arrow: true,
      hideOnClick: false,
      onShow(instance) {
        setTimeout(() => {
          instance.hide();
        }, 1000);
      },
      trigger: 'click', // Изменяем триггер на клик
    });

  }
  // -- copy end


});



watchEffect(() => {
  // Получаем ссылку на элемент по его ref
  const tableCodeRef = tableCode.value;

  // Проверяем, что элемент доступен в DOM
  if (tableCodeRef) {
    // Получаем ссылку на элемент по его ref
    const tableCodeRef = tableCode.value;
    
    // Проверяем, что элемент доступен в DOM
    if (tableCodeRef) {
      const liElementsWithUl = tableCodeRef.querySelectorAll('li:has(ul)');

      if (liElementsWithUl.length > 0) {
        liElementsWithUl.forEach((liElement) => {
          const link = liElement.querySelector(':scope > :not(ul)');

          if (link) {
            link.addEventListener('click', () => {
              liElement.classList.toggle('open');
            });
          }

        });
      }
    }
  } else {
    console.error('Элемент tableCode не найден в DOM');
  }
});
</script>

<template>
  <Transition name="fade">
    <div class="table" id="mainTable">
      <div class="slider-table-progress">
        <div :class="{ active: currentSlideIndex === 0 }"></div>
        <div :class="{ active: currentSlideIndex >= 1 }"></div>
        <div :class="{ active: currentSlideIndex === 2 }"></div>
      </div>
      <div class="table-version">

        <CommonDropDown :items="serversStore.getNameData" v-model="serverSelectedOption"
          @update:modelValue="handleChangeSelectServer" />
      </div>


      <Swiper :slides-per-view="'auto'" :effect="'creative'" :autoplay="{
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
        }" :breakpoints="{ 999: { slidesPerView: 1 }, 1000: { slidesPerView: 3 } }" @swiper="onSwiperInit"
        @slideChange="onSlideChange" :navigation="{
          nextEl: '.slider-table-next',
        }" class="slider-table">

        <SwiperSlide class="table-resizeable-left">
          <div class="table-content">
            <div class="table-head empty">
              <CommonDropDown :items="serversStore.getNameData" v-model="serverSelectedOption"
                @update:modelValue="handleChangeSelectServer" />
            </div>
            <div class="table-scroll-wrap">
              <div class="table-scroll">
                <ul class="table-main-links js_tabs">
                  <li v-for="(method, index_method) in serversStore.getMethods" :key="index_method">
                    <button class="link" :class="{ active: selectedTab === method.type }"
                      @click="changeSelectedTab(method.type)"><span class="table-method"
                        :class="method.type === 'get' ? 'green' : 'blue'">{{ method.name }}</span>
                      <span class="text">{{ method.desc }}</span>
                    </button>
                  </li>
                </ul>
                <!-- end .table-main-links-->
              </div>
            </div>
            <!-- end .table-scroll-wrap-->
          </div>
          <!-- end .table-content-->

        </SwiperSlide><!-- end table-resizeable-left -->

        <SwiperSlide class="table-center">
          <div class="table-content table-tab-content" v-for="(method, index_method) in serversStore.getMethods"
            :key="index_method" :class="{ visible: selectedTab === method.type }" data-id="#table-tab1">
            <div class="table-head">
              <span class="table-method" :class="method.type === 'get' ? 'green' : 'blue'">{{ method.name
                }}</span>
              <span class="text">{{ method.desc }}</span>
              <button class="btn btn-pink-black btn-test-endpoint" @click="handleTestEndpoint">
                <span>Test endpoint</span>
              </button>
            </div>
            <!-- end .table-head-->
            <div class="table-scroll-wrap">
              <div class="table-scroll">
                <div class="table-descr">
                  <h4 class="title">
                    Получение деталей товара по его URL адресу или SKU.
                  </h4>
                  Чтобы воспользоваться этим методом, подставьте интересующие
                  значения в поля ниже, примените другие настройки,
                  при необходимости и протестируйте ваш запрос, ознакомтесь
                  с ответом системы.
                </div>
                <!-- end .table-descr-->

                <div class="table-folded open">
                  <h4 class="head" @click="openMainParams">Основные параметры</h4>
                  <Collapse :when="mainParamsStatus" class="v-collapse">
                    <div class="inner">
                      <div class="spacing">
                        <div class="table-form-el">
                          <div class="table-form-label">
                            WBPublicAPI-Key <span class="small">ENUM</span>
                          </div>
                          <CommonDropDown :items="serversStore.getParamsMainData" v-model="paramsMainSelectedOption"
                            @update:modelValue="handleParamsMainSelected" />
                          <div class="table-form-subtext">
                            <div class="red">обязательный параметр</div>
                          </div>
                        </div>
                        <!-- end .form-el-->
                        <div class="table-form-el">
                          <div class="table-form-label">
                            WBPublicAPI-Host <span class="small">STRING</span>
                          </div>
                          <input class="table-input" :value="paramsMainSelectedOption?.value" type="text" />
                          <div class="table-form-subtext">
                            <div class="red">обязательный параметр</div>
                          </div>
                        </div>
                        <!-- end .form-el-->
                      </div>
                    </div>
                  </Collapse>

                  <!-- end .inner-->
                </div>
                <!-- end .table-folded-->
                <div class="table-folded open">
                  <h4 class="head" @click="openAdditionalParams">Дополнительные параметры</h4>
                  <Collapse :when="additionalParamsStatus" class="v-collapse">
                    <div class="inner">
                      <div class="spacing">
                        <div class="table-form-el">
                          <div class="table-form-label">
                            WBPublicAPI-SKU <span class="small">STRING</span>
                          </div>
                          <input class="table-input" v-model="paramsAdditionalOption" type="text" />
                          <div class="table-form-subtext">
                            <div class="red">обязательный параметр</div>
                            <div>пример: 357457457535</div>
                          </div>
                        </div>
                        <!-- end .form-el-->
                      </div>
                    </div>
                    <!-- end .inner-->
                  </Collapse>
                </div>
                <!-- end .table-folded-->
              </div>
            </div>
            <!-- end .table-scroll-wrap-->
          </div>
        </SwiperSlide>
        <!-- end .table-content-->

        <SwiperSlide class="table-resizeable-right">

          <div class="table-content">
            <ul class="table-head table-tabs js_tabs">
              <li>
                <button class="btn btn-small btn-grey" :class="{ active: selectedResponseTab === 'code' }"
                  @click="changeResponseSelectedTab('code')"><span>Примеры
                    кода</span></button>
              </li>
              <li>
                <button class="btn btn-small btn-grey" :class="{ active: selectedResponseTab === 'response' }"
                  @click="changeResponseSelectedTab('response')"><span>Примеры
                    ответа</span></button>
              </li>
              <li>
                <button class="btn btn-small btn-grey" :class="{ active: selectedResponseTab === 'result' }"
                  :disabled="isResultTestEndpoint !== true" @click="changeResponseSelectedTab('result')">
                  <span>Полученный результат</span>
                </button>
              </li>
            </ul>
            <!-- end .table-head-->
            <div class="table-tab-content" :class="{ visible: selectedResponseTab === 'code' }"
              data-id="#table-code-example">
              <div class="table-inner-head">
                <div class="table-select dark custom-select">
                  <CommonDropDown :items="serversStore.getLangsData" v-model="selectedLangOption" />
                  <div class="arrow"></div>
                </div>
                <!-- end .table-select-->
                <button class="btn btn-pink-black js_copy-table-code" @click="copyToClipboard(selectedLangOption.value)"
                  ref="copyRef">
                  <span>Копировать код</span>
                </button>
              </div>
              <!-- end .table-inner-head-->

              <div class="table-tab-content" :class="{ visible: selectedTab === 'get' }" data-id="#table-tab1">
                <div class="table-scroll-wrap with-bg">
                  <div class="table-scroll">
                    <pre class="table-code" v-if="selectedLangOption">
                    {{ selectedLangOption.value }}
                  </pre>
                    <!-- end .table-code-->
                  </div>
                </div>
                <!-- end .table-scroll-wrap-->
              </div>
              <!-- end .table-tab-content-->
              <div class="table-tab-content" :class="{ visible: selectedTab === 'post' }" data-id="#table-tab2">
                <div class="table-scroll-wrap with-bg">
                  <div class="table-scroll">
                    <pre class="table-code" v-if="selectedLangOption"> {{ selectedLangOption.value }}</pre>
                    <!-- end .table-code-->
                  </div>
                </div>
                <!-- end .table-scroll-wrap-->
              </div>
              <!-- end .table-tab-content-->
            </div>
            <!-- end .table-tab-content-->
            <div class="table-tab-content" :class="{ visible: selectedResponseTab === 'response' }"
              data-id="#table-response-example">
              <div class="table-inner-head">
                <div class="text">Статусы ответов</div>
                <div class="table-select dark">
                  <CommonDropDown :items="serversStore.getSelectedResponses" v-model="selectedResponseOption" />
                  <div class="arrow"></div>
                </div>
              </div>
              <!-- end .table-inner-head-->
              <div class="table-tab-content" :class="{ visible: selectedResponseTab === 'code' }" data-id="#table-tab1">
                <div class="table-scroll-wrap with-bg">
                  <div class="table-scroll">
                    <div class="table-code" v-html="selectedResponseOption.value" v-if="selectedResponseOption"></div>
                    <!-- end .table-code-->
                  </div>
                </div>
                <!-- end .table-scroll-wrap-->
              </div>
              <!-- end .table-tab-content-->
              <div class="table-tab-content" :class="{ visible: selectedResponseTab === 'response' }"
                data-id="#table-tab2">
                <div class="table-scroll-wrap with-bg">
                  <div class="table-scroll">
                    <div ref="tableCode" v-if="selectedResponseOption" v-html="selectedResponseOption.value"
                      class="example-response-code"></div>
                    <!-- <div class="table-code" v-html="selectedResponseOption.value" v-if="selectedResponseOption"></div> -->
                    <!-- end .table-code-->
                  </div>
                </div>
                <!-- end .table-scroll-wrap-->
              </div>
              <!-- end .table-tab-content-->
            </div>
            <!-- end .table-tab-content-->

            <div class="table-tab-content" :class="{ visible: selectedResponseTab === 'result' }" data-id="#table-tab3">
              <div class="table-scroll-wrap with-bg">
                <div class="table-scroll">
                  <div class="table-code" v-if="testEndpointResultData">
                    <pre> {{ testEndpointResultData }} </pre>
                  </div>
                  <!-- end .table-code-->
                </div>
              </div>
              <!-- end .table-scroll-wrap-->
            </div>
            <!-- end .table-tab-content-->
          </div>
          <!-- end .table-content-->
        </SwiperSlide>

      </Swiper>
      <!-- end .slider-table-->
      <div class="table-nav">
        <div class="slide0" v-show="currentSlideIndex === 0">
          <div class="btn btn-pink-black slider-table-next" @click="nextSlide">
            <span>Следующий шаг</span>
          </div>
        </div>
        <div class="slide1" v-show="currentSlideIndex === 1">
          <div class="btn btn-grey slider-table-prev" @click="goToFirstSlide">
            <svg width="24" height="24">
              <use xlink:href="/img/sprite.svg#undo"></use>
            </svg>
          </div>
          <div class="btn btn-pink-black slider-table-next" @click="testEndpointAndNext">
            <span>Test endpoint</span>
          </div>
        </div>
        <div class="slide2" v-show="currentSlideIndex === 2">
          <div class="btn btn-grey slider-table-prev" @click="goToFirstSlide">
            <svg width="24" height="24">
              <use xlink:href="/img/sprite.svg#undo"></use>
            </svg>
          </div>
          <div class="btn btn-pink-black slider-table-start" @click="goToFirstSlide">
            <span>Вернуться в начало</span>
          </div>
        </div>
      </div>
      <!-- end .table-nav-->
    </div>
  </Transition>
</template>

<style>
.table.desktop {
  min-height: 300px;
}

.slider-table {
  /* display: grid;
  grid-template-columns: 1fr 2fr 2fr; */
}

.btn-tippy {
  position: relative;
}

.tippy {
  position: absolute;
  top: -100%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #000;
  min-width: 150px;
  width: 100%;


}

.bubble {
  position: relative;
  padding: 4px 8px;
  background: #fff;
  -webkit-border-radius: 16px;
  -moz-border-radius: 16px;
  border-radius: 16px;
  text-align: center;
}

.bubble:after {
  content: '';
  position: absolute;
  border-style: solid;
  border-width: 8px 8px 0;
  border-color: #fff transparent;
  display: block;
  width: 0;
  z-index: 1;
  margin-left: -8px;
  bottom: -8px;
  left: 50%;
}
</style>