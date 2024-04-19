<script setup lang="ts">
import { useAuthStore } from "@/store/auth.store";
const store = useAuthStore()

const daysText = computed(() => {
    const days: number = store.getKeyExpired;

    // Определение формы слова "день" в зависимости от числительного
    if (days === 1 || (days % 10 === 1 && days % 100 !== 11)) {
        return `${days} день`;
    } else if (
        (days > 1 && days < 5) ||
        ((days % 10 > 1 && days % 10 < 5) && (days % 100 < 10 || days % 100 > 20))
    ) {
        return `${days} дня`;
    } else {
        return `${days} дней`;
    }
});
</script>

<template>
    <div class="block info h3">
        <h3>Осталось действия ключа по тарифу:</h3>
        <div class="blue">{{ daysText }}</div>
    </div>
    <!-- end .info-->
</template>