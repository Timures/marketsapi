<script setup lang="ts">
import { useAuthStore } from '#imports';
const authStore = useAuthStore()

const props = defineProps<{ onClose?: () => void }>();

const selectedValue = ref<string>('100');
const radioName = 'buy-requests-radio'; // Имя для группы радио-инпутов

const options = [
    { label: '100', value: '100' },
    { label: '500', value: '500' },
    { label: '1000', value: '1000' },
    { label: '5000', value: '5000' },
    { label: '10000', value: '10000' },
];

// Обработчик изменения значения радио-инпута
const handleBuyRequests = () => {
    const buyRequestsData = {requests:parseInt(selectedValue.value) + authStore.getRequestValue}
    authStore.patchUserRequestsValue(buyRequestsData)
    console.log('selectedValue.value ', selectedValue.value);
    // Emit close event to close the modal after successful requsts buy
    props.onClose && props.onClose();
}
/** Выводим время до полуночи */

const now = new Date(); // Текущая дата и время
const midnight = new Date(now); // Копия текущей даты и времени
midnight.setHours(24, 0, 0, 0); // Установка времени на полуночь

const differenceMs = ref(midnight.getTime() - now.getTime()); // Вычисление разницы в миллисекундах до полуночи

// Функция для форматирования оставшегося времени
const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60)).toString().padStart(2, '0');
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};

// Оставшееся время до полуночи в формате "часы:минуты:секунды"
const timeUntilMidnight = computed(() => formatTime(differenceMs.value));

// Функция для обновления времени каждую секунду
let intervalId: NodeJS.Timeout | null = null;
const startTimer = () => {
    intervalId = setInterval(() => {
        differenceMs.value = midnight.getTime() - new Date().getTime();
    }, 1000);
};

// Запуск таймера при монтировании компонента
onMounted(() => {
    startTimer();
});

// Остановка таймера при демонтаже компонента
onUnmounted(() => {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
});
/** Выводим текущее количество использованных запросов */
const userRequests = computed(() => ({
    used: authStore.getRequestUsed,
    all: authStore.getRequestValue
}))
</script>

<template>
    <div class="modal-head">
        <h2 class="h3">Купить дополнительные запросы</h2>
        <div class="text">Запросов использовано сегодня: {{ userRequests.used }} из {{ userRequests.all }}</div>
    </div>
    <!-- end .modal-head-->
    <form class="buy-requests"  @submit.prevent="handleBuyRequests">
        <div class="checks">
            <label v-for="option in options" :key="option.value">
                <input type="radio" :name="radioName" :value="option.value" v-model="selectedValue">
                <span class="btn"><span>{{ option.label }}</span></span>
            </label>
        </div>
        <!-- end .checks-->
        <button class="btn btn-pink-black btn-big" type="submit"><span>Купить запросы</span></button>
        <div class="info">
            <h3 class="h3">Внимание!</h3>
            <div class="text">Дополнительные запросы действуют только на текущие сутки.<br>
                Осталось времени сегодня: <strong>{{ timeUntilMidnight }}</strong></div>
        </div>
        <!-- end .info-->
    </form>
    <!-- end .buy-requests-->
</template>

<style lang="scss" scoped></style>