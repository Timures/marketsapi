<script setup lang="ts">
import {ref} from 'vue'
import { Collapse } from 'vue-collapsed'

const selectedTab = ref('get')
const selectedAnswerTab = ref('code')
const changeSelectedTab = (tab) => {
selectedTab.value = tab
};
const changeAnswerSelectedTab = (tab) => {
selectedAnswerTab.value = tab
};

const mainParamsStatus = ref(true)
const additionalParamsStatus = ref(true)

const openMainParams = () => {
     mainParamsStatus.value == false ? mainParamsStatus.value = true : mainParamsStatus.value = false
}

const openAdditionalParams = () => {
    additionalParamsStatus.value == false ? additionalParamsStatus.value = true : additionalParamsStatus.value = false
}


const apiSelectedOption = ref(null)
const items = ref([
  { name: 'Option 1', value: '1' },
  { name: 'Option 2', value: '2' },
  { name: 'Option 3', value: '3' },
])


</script>

<template>
<div class="table desktop">
    <div class="table-version">
      <CommonDropDown :items="items" v-model="apiSelectedOption" />
    </div>

    <div class="slider-table">
        <div class="table-resizeable-left">
            <div class="table-content">
            <div class="table-head empty"></div>
            <div class="table-scroll-wrap">
              <div class="table-scroll">
                <ul class="table-main-links js_tabs">
                  <li>
                    <button class="link" :class="{active: selectedTab === 'get'}" @click="changeSelectedTab('get')" 
                      ><span class="table-method green">GET</span>
                      <span class="text">v1 - item details</span>
                      </button>
                  </li>
                  <li>
                    <button class="link" :class="{active: selectedTab === 'post'}" @click="changeSelectedTab('post')" 
                      ><span class="table-method blue">POST</span>
                      <span class="text">v1 - get item from url</span>
                      </button>
                  </li>
                </ul>
                <!-- end .table-main-links-->
              </div>
            </div>
            <!-- end .table-scroll-wrap-->
          </div>
          <!-- end .table-content-->
        </div>

        <div class="table-content table-tab-content" :class="{visible: selectedTab === 'get'}" data-id="#table-tab1">
            <div class="table-head">
              <span class="table-method green">GET</span>
              <span class="text">v1 - item details</span>
              <a class="btn btn-pink-black"><span>Test endpoint</span></a>
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
                        <div class="table-select white">
                          <select>
                            <option>Автоматически подключен тестовый</option>
                          </select>
                          <div class="arrow"></div>
                        </div>
                        <div class="table-form-subtext">
                          <div class="red">обязательный параметр</div>
                        </div>
                      </div>
                      <!-- end .form-el-->
                      <div class="table-form-el">
                        <div class="table-form-label">
                          WBPublicAPI-Host <span class="small">STRING</span>
                        </div>
                        <input
                          class="table-input"
                          value="wbhistory.s2.marketsapi.ru"
                          type="text"
                        />
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
                        <input
                          class="table-input"
                          value="3613644237542745"
                          type="text"
                        />
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
          <!-- end .table-content-->
          <div class="table-content table-tab-content" :class="{visible: selectedTab === 'post'}" data-id="#table-tab2">
            <div class="table-head">
              <span class="table-method blue">POST</span>
              <span class="text">v1 - get item from url</span>
              <a class="btn btn-pink-black"><span>Test endpoint</span></a>
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
                  <h4 class="head">Основные параметры</h4>
                  <div class="inner">
                    <div class="spacing">
                      <div class="table-form-el">
                        <div class="table-form-label">
                          WBPublicAPI-Key <span class="small">ENUM</span>
                        </div>
                        <div class="table-select white">
                          <select>
                            <option>Автоматически подключен тестовый</option>
                          </select>
                          <div class="arrow"></div>
                        </div>
                        <div class="table-form-subtext">
                          <div class="red">обязательный параметр</div>
                        </div>
                      </div>
                      <!-- end .form-el-->
                      <div class="table-form-el">
                        <div class="table-form-label">
                          WBPublicAPI-Host <span class="small">STRING</span>
                        </div>
                        <input
                          class="table-input"
                          value="wbhistory.s2.marketsapi.ru"
                          type="text"
                        />
                        <div class="table-form-subtext">
                          <div class="red">обязательный параметр</div>
                        </div>
                      </div>
                      <!-- end .form-el-->
                    </div>
                  </div>
                  <!-- end .inner-->
                </div>
                <!-- end .table-folded-->
                <div class="table-folded open">
                  <h4 class="head">Дополнительные параметры</h4>
                  <div class="inner">
                    <div class="spacing">
                      <div class="table-form-el">
                        <div class="table-form-label">
                          WBPublicAPI-SKU <span class="small">STRING</span>
                        </div>
                        <input
                          class="table-input"
                          value="3613644237542745"
                          type="text"
                        />
                        <div class="table-form-subtext">
                          <div class="red">обязательный параметр</div>
                          <div>пример: 357457457535</div>
                        </div>
                      </div>
                      <!-- end .form-el-->
                    </div>
                  </div>
                  <!-- end .inner-->
                </div>
                <!-- end .table-folded-->
              </div>
            </div>
            <!-- end .table-scroll-wrap-->
          </div>
          <!-- end .table-content-->

          <div class="table-resizeable-right">
          <div class="table-content">
            <ul class="table-head table-tabs js_tabs">
              <li>
                <button
                  class="btn btn-small btn-grey active"
                  @click="changeAnswerSelectedTab('code')" 
                  ><span>Примеры кода</span></button>
              </li>
              <li>
                <button class="btn btn-small btn-grey" @click="changeAnswerSelectedTab('response')" 
                  ><span>Примеры ответа</span></button>
              </li>
              <li>
                <button class="btn btn-small btn-grey disabled" href="#"
                  ><span>Полученный результат</span></button>
              </li>
            </ul>
            <!-- end .table-head-->
            <div class="table-tab-content" :class="{visible: selectedAnswerTab === 'code'}" data-id="#table-code-example">
              <div class="table-inner-head">
                <div class="table-select dark custom-select">
                  <select class="original-select">
                    <option>(Node.js) Axios</option>
                    <option>C</option>
                    <option>C#</option>
                    <option>Go</option>
                    <option>HTTP</option>
                    <option>Java</option>
                    <option>Javascript</option>
                    <option>PHP</option>
                  </select>
                  <div class="arrow"></div>
                </div>
                <!-- end .table-select-->
                <div
                  class="btn btn-pink-black js_copy-table-code"
                  data-tippy-content="Код скопирован"
                >
                  <span>Копировать код</span>
                </div>
              </div>
              <!-- end .table-inner-head-->
              <div class="table-tab-content" :class="{visible: selectedTab === 'get'}" data-id="#table-tab1">
                <div class="table-scroll-wrap with-bg">
                  <div class="table-scroll">
                    <pre class="table-code">
const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://taobao-tmall-16881.p.rapidapi.com/api/tkl/v2/item/detail',
  params: {
    provider: 'taobao',
    id: '730337851259'
  },
  headers: {
    'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
    'X-RapidAPI-Host': 'taobao-tmall-16881.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}</pre
                    >
                    <!-- end .table-code-->
                  </div>
                </div>
                <!-- end .table-scroll-wrap-->
              </div>
              <!-- end .table-tab-content-->
              <div class="table-tab-content" :class="{visible: selectedTab === 'post'}" data-id="#table-tab2">
                <div class="table-scroll-wrap with-bg">
                  <div class="table-scroll">
                    <pre class="table-code">
const axios = require('axios');

const encodedParams = new URLSearchParams();
encodedParams.set('url', '【女童连衣裙夏2020夏纯棉绣花长袖长款连衣裙公主裙中小童连衣裙】复制￥fHK56aP20luan￥，打开【手机阿里】或【支付宝-点首页进行搜索】查看：https://qr.1688.com/share.html?secret=vOdX4Ah3');

const options = {
  method: 'POST',
  url: 'https://taobao-tmall-16881.p.rapidapi.com/api/tkl/item/url',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
    'X-RapidAPI-Host': 'taobao-tmall-16881.p.rapidapi.com'
  },
  data: encodedParams,
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}</pre
                    >
                    <!-- end .table-code-->
                  </div>
                </div>
                <!-- end .table-scroll-wrap-->
              </div>
              <!-- end .table-tab-content-->
            </div>
            <!-- end .table-tab-content-->
            <div class="table-tab-content" :class="{visible: selectedAnswerTab === 'response'}" data-id="#table-response-example">
              <div class="table-inner-head">
                <div class="text">Статусы ответов</div>
                <div class="table-select dark">
                  <select>
                    <option>200</option>
                    <option>400</option>
                  </select>
                  <div class="arrow"></div>
                </div>
              </div>
              <!-- end .table-inner-head-->
              <div class="table-tab-content"  :class="{visible: selectedAnswerTab === 'code'}" data-id="#table-tab1">
                <div class="table-scroll-wrap with-bg">
                  <div class="table-scroll">
                    <div class="table-code">
                      <ul>
                        <li class="open">
                          <div>item {} 18 keys:</div>
                          <ul>
                            <li class="open">
                              <div>item {} 18 keys:</div>
                              <ul>
                                <li>
                                  <div>num_iid: "730337851259"</div>
                                </li>
                                <li>
                                  <div>
                                    title:
                                    <span class="green"
                                      >"Резиновые сапоги белые для женщин"</span
                                    >
                                  </div>
                                </li>
                                <li>
                                  <div>desc_short: ""</div>
                                </li>
                                <li>
                                  <div>
                                    price: <span class="blue">"79.00"</span>
                                  </div>
                                </li>
                                <li>
                                  <div>total_price: 0</div>
                                </li>
                                <li>
                                  <div>suggestive_price: 0</div>
                                </li>
                                <li>
                                  <div>
                                    orginal_price:
                                    <span class="blue">"79.00"</span>
                                  </div>
                                </li>
                                <li>
                                  <div>
                                    nick:
                                    <span class="green">"珂茹旗舰店"</span>
                                  </div>
                                </li>
                                <li>
                                  <div>num: null</div>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <div>item {} 18 keys:</div>
                              <ul>
                                <li>
                                  <div>num_iid: "730337851259"</div>
                                </li>
                                <li>
                                  <div>
                                    title:
                                    <span class="green"
                                      >"Резиновые сапоги белые для женщин"</span
                                    >
                                  </div>
                                </li>
                                <li>
                                  <div>desc_short: ""</div>
                                </li>
                                <li>
                                  <div>
                                    price: <span class="blue">"79.00"</span>
                                  </div>
                                </li>
                                <li>
                                  <div>total_price: 0</div>
                                </li>
                                <li>
                                  <div>suggestive_price: 0</div>
                                </li>
                                <li>
                                  <div>
                                    orginal_price:
                                    <span class="blue">"79.00"</span>
                                  </div>
                                </li>
                                <li>
                                  <div>
                                    nick:
                                    <span class="green">"珂茹旗舰店"</span>
                                  </div>
                                </li>
                                <li>
                                  <div>num: null</div>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <div>item {} 18 keys:</div>
                          <ul>
                            <li>
                              <div>item {} 18 keys:</div>
                              <ul>
                                <li>
                                  <div>num_iid: "730337851259"</div>
                                </li>
                                <li>
                                  <div>
                                    title:
                                    <span class="green"
                                      >"Резиновые сапоги белые для женщин"</span
                                    >
                                  </div>
                                </li>
                                <li>
                                  <div>desc_short: ""</div>
                                </li>
                                <li>
                                  <div>
                                    price: <span class="blue">"79.00"</span>
                                  </div>
                                </li>
                                <li>
                                  <div>total_price: 0</div>
                                </li>
                                <li>
                                  <div>suggestive_price: 0</div>
                                </li>
                                <li>
                                  <div>
                                    orginal_price:
                                    <span class="blue">"79.00"</span>
                                  </div>
                                </li>
                                <li>
                                  <div>
                                    nick:
                                    <span class="green">"珂茹旗舰店"</span>
                                  </div>
                                </li>
                                <li>
                                  <div>num: null</div>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                    <!-- end .table-code-->
                  </div>
                </div>
                <!-- end .table-scroll-wrap-->
              </div>
              <!-- end .table-tab-content-->
              <div class="table-tab-content" :class="{visible: selectedAnswerTab === 'response'}" data-id="#table-tab2">
                <div class="table-scroll-wrap with-bg">
                  <div class="table-scroll">
                    <div class="table-code">
                      <ul>
                        <li class="open">
                          <div>item {} 18 keys:</div>
                          <ul>
                            <li class="open">
                              <div>item {} 18 keys:</div>
                              <ul>
                                <li>
                                  <div>num_iid: "730337851259"</div>
                                </li>
                                <li>
                                  <div>
                                    title:
                                    <span class="green"
                                      >"Резиновые сапоги белые для женщин"</span
                                    >
                                  </div>
                                </li>
                                <li>
                                  <div>desc_short: ""</div>
                                </li>
                                <li>
                                  <div>
                                    price: <span class="blue">"79.00"</span>
                                  </div>
                                </li>
                                <li>
                                  <div>total_price: 0</div>
                                </li>
                                <li>
                                  <div>suggestive_price: 0</div>
                                </li>
                                <li>
                                  <div>
                                    orginal_price:
                                    <span class="blue">"79.00"</span>
                                  </div>
                                </li>
                                <li>
                                  <div>
                                    nick:
                                    <span class="green">"珂茹旗舰店"</span>
                                  </div>
                                </li>
                                <li>
                                  <div>num: null</div>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <div>item {} 18 keys:</div>
                              <ul>
                                <li>
                                  <div>num_iid: "730337851259"</div>
                                </li>
                                <li>
                                  <div>
                                    title:
                                    <span class="green"
                                      >"Резиновые сапоги белые для женщин"</span
                                    >
                                  </div>
                                </li>
                                <li>
                                  <div>desc_short: ""</div>
                                </li>
                                <li>
                                  <div>
                                    price: <span class="blue">"79.00"</span>
                                  </div>
                                </li>
                                <li>
                                  <div>total_price: 0</div>
                                </li>
                                <li>
                                  <div>suggestive_price: 0</div>
                                </li>
                                <li>
                                  <div>
                                    orginal_price:
                                    <span class="blue">"79.00"</span>
                                  </div>
                                </li>
                                <li>
                                  <div>
                                    nick:
                                    <span class="green">"珂茹旗舰店"</span>
                                  </div>
                                </li>
                                <li>
                                  <div>num: null</div>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                        <li>
                          <div>item {} 18 keys:</div>
                          <ul>
                            <li>
                              <div>item {} 18 keys:</div>
                              <ul>
                                <li>
                                  <div>num_iid: "730337851259"</div>
                                </li>
                                <li>
                                  <div>
                                    title:
                                    <span class="green"
                                      >"Резиновые сапоги белые для женщин"</span
                                    >
                                  </div>
                                </li>
                                <li>
                                  <div>desc_short: ""</div>
                                </li>
                                <li>
                                  <div>
                                    price: <span class="blue">"79.00"</span>
                                  </div>
                                </li>
                                <li>
                                  <div>total_price: 0</div>
                                </li>
                                <li>
                                  <div>suggestive_price: 0</div>
                                </li>
                                <li>
                                  <div>
                                    orginal_price:
                                    <span class="blue">"79.00"</span>
                                  </div>
                                </li>
                                <li>
                                  <div>
                                    nick:
                                    <span class="green">"珂茹旗舰店"</span>
                                  </div>
                                </li>
                                <li>
                                  <div>num: null</div>
                                </li>
                              </ul>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                    <!-- end .table-code-->
                  </div>
                </div>
                <!-- end .table-scroll-wrap-->
              </div>
              <!-- end .table-tab-content-->
            </div>
            <!-- end .table-tab-content-->
          </div>
          <!-- end .table-content-->
        </div>
    </div>
</div>
</template>

<style scoped>
.slider-table {
    display: grid;
    grid-template-columns: 1fr 2fr 2fr;
}

.custom-select {
  position: relative;
  width: 200px; /* Настройте ширину по своему усмотрению */
}


.original-select {
  appearance: none; /* Убирает стандартный стиль селекта */
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
  background-color: #fff;
  cursor: pointer;

  
}

.original-select:focus {
  outline: none;
  /* border-color: blue; Пример: изменение цвета при фокусе */
}

/* Стилизация опций */
.original-select option {
  padding: 8px;
  display: block;
    font: normal 15px / 1.3 var(--font);
    color: var(--black);
    padding: 4px 12px;
    cursor: pointer;
    user-select: none;
    transition: 0.3 ease color;
}
.original-select option:checked {
    color: var(--pink);
}
.original-select option:hover  {
    color: var(--pink);
    background-color: #fff;
}
</style>