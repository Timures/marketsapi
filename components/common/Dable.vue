<script setup lang="ts">
import { useServersStore } from '@/store/servers.store'
import { ref, onMounted, watch } from 'vue';

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
};


/** Выбор сервера */
// Создайте ссылку для хранения выбранного сервера
const serverSelectedOption = ref<ServerOption | null>(serversStore.getNameValueData);

const handleChangeSelectServer = () => {
    console.log('change server', serverSelectedOption.value);
    serversStore.selectServerByValue(serverSelectedOption.value?.value)
}
// Загрузите данные и установите начальное значение после монтирования компонента
onMounted(async () => {
  await serversStore.fetchServers(); // Загрузка данных из хранилища
  const defaultServer = serversStore.getNameValueData; // Получите данные из хранилища
  if (defaultServer !== null) {
    serverSelectedOption.value = defaultServer; // Установите начальное значение
  } else {
    console.error('Ошибка при загрузке данных из сервера.');
  }
});
</script>

<template>
    <div class="table desktop">
    <div class="table-version">
      <CommonDropDown :items="serversStore.getNameData" 
      v-model="serverSelectedOption"
      @update:modelValue="handleChangeSelectServer"
      />
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
      </div>
    </div>
</template>

<style>
.table.desktop {
    min-height: 300px;
}</style>