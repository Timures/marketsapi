<script setup lang="ts">
import { useServersStore } from '@/store/servers.store'
import { ref, onMounted, watch } from 'vue';
import { Collapse } from 'vue-collapsed'

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

const paramsMainSelectedOption = ref<Params | null>()
const handleParamsMainSelected = () => {
    serversStore.selectParamsByValue(paramsMainSelectedOption.value?.value)
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

/** Выбор сервера */
// Создайте ссылку для хранения выбранного сервера
const serverSelectedOption = ref<ServerOption | null>(serversStore.getNameValueData);

const handleChangeSelectServer = () => {
    // console.log('change server', serverSelectedOption.value);
    serversStore.selectServerByValue(serverSelectedOption.value?.value)
}
// Загрузите данные и установите начальное значение после монтирования компонента
onMounted(async () => {
    await serversStore.fetchServers(); // Загрузка данных из хранилища
    const defaultServer = serversStore.getNameValueData; // Получите данные из хранилища
    if (defaultServer !== null) {
        serverSelectedOption.value = defaultServer; // Установите начальное значение
        paramsMainSelectedOption.value = serversStore.getParamsMainData[0]
        selectedTab.value = serversStore.getMethods[0].type
        selectedLangOption.value = serversStore.getLangsData[0]
    } else {
        console.error('Ошибка при загрузке данных из сервера.');
    }
});
</script>

<template>
    <div class="table desktop">
        <div class="table-version">
            <CommonDropDown :items="serversStore.getNameData" v-model="serverSelectedOption"
                @update:modelValue="handleChangeSelectServer" />
        </div>

        <div class="slider-table">
            <div class="table-resizeable-left">
                <div class="table-content">
                    <div class="table-head empty"></div>
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
            </div>
            <!-- end table-resizeable-left -->

            <div class="table-content table-tab-content" v-for="(method, index_method) in serversStore.getMethods"
                :key="index_method" :class="{ visible: selectedTab === method.type }" data-id="#table-tab1">
                <div class="table-head">
                    <span class="table-method" :class="method.type === 'get' ? 'green' : 'blue'">{{ method.name
                        }}</span>
                    <span class="text">{{ method.desc }}</span>
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
                                            <CommonDropDown :items="serversStore.getParamsMainData"
                                                v-model="paramsMainSelectedOption"
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
                                            <input class="table-input" :value="paramsMainSelectedOption?.value"
                                                type="text" />
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
            <!-- end .table-content-->

            <div class="table-resizeable-right">
        <div class="table-content">
          <ul class="table-head table-tabs js_tabs">
            <li>
              <button class="btn btn-small btn-grey" :class="{active : selectedResponseTab === 'code'}" @click="changeResponseSelectedTab('code')"><span>Примеры
                  кода</span></button>
            </li>
            <li>
              <button class="btn btn-small btn-grey" :class="{active : selectedResponseTab === 'response'}" @click="changeResponseSelectedTab('response')"><span>Примеры
                  ответа</span></button>
            </li>
            <li>
              <button class="btn btn-small btn-grey disabled" href="#"><span>Полученный результат</span></button>
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
              <div class="btn btn-pink-black js_copy-table-code" data-tippy-content="Код скопирован">
                <span>Копировать код</span>
              </div>
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
                <select>
                  <option>200</option>
                  <option>400</option>
                </select>
                <div class="arrow"></div>
              </div>
            </div>
            <!-- end .table-inner-head-->
            <div class="table-tab-content" :class="{ visible: selectedResponseTab === 'code' }" data-id="#table-tab1">
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
                                  <span class="green">"Резиновые сапоги белые для женщин"</span>
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
                                  <span class="green">"Резиновые сапоги белые для женщин"</span>
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
                                  <span class="green">"Резиновые сапоги белые для женщин"</span>
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
            <div class="table-tab-content" :class="{ visible: selectedResponseTab === 'response' }" data-id="#table-tab2">
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
                                  <span class="green">"Резиновые сапоги белые для женщин"</span>
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
                                  <span class="green">"Резиновые сапоги белые для женщин"</span>
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
                                  <span class="green">"Резиновые сапоги белые для женщин"</span>
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

<style>
.table.desktop {
    min-height: 300px;
}
.slider-table {
    display: grid;
    grid-template-columns: 1fr 2fr 2fr;
}
</style>