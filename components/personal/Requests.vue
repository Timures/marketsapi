<script setup lang="ts">
import { useAuthStore } from "@/store/auth.store";
const store = useAuthStore()

const progressWidth = computed(() => {
    // Вычисляем процент использованных запросов от общего числа запросов
    const percentage = (store.getRequestUsed / store.getRequestValue) * 100;
    return `${percentage}%`;
});
</script>

<template>
    <div class="block info h3">
        <h3>Запросов использовано сегодня:</h3>
        <div><span class="blue">{{ store.getRequestUsed }}</span> из {{ store.getRequestValue }}</div>
        <div class="progress">
            <div class="blue" :style="{ width: progressWidth }"></div>
        </div>
    </div>
    <!-- end .info-->
</template>