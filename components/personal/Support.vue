<script setup lang="ts">
import { useTippy } from 'vue-tippy'

const supportEmail = ref('teh@marketsapi.ru')
const copyText = 'Почта скопирована'
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

const tooltipButton = ref<HTMLButtonElement | null>(null);

onMounted(() => {
    if (tooltipButton.value) {
        useTippy(tooltipButton.value, {
            theme: 'light',
            content: copyText,
            // show and hide delay are 100ms
            delay: 100,
            arrow: true,
            hideOnClick: false,
            onShow(instance) {
                instance.setProps({
                    hideOnClick: true, // Включаем скрытие при клике для текущего показа
                });
                setTimeout(() => {
                    instance.hide();
                }, 1000);
            },
            trigger: 'click', // Изменяем триггер на клик
        });
        
  }
});


</script>

<template>
    <div class="block help">
        <div class="head">
            <h3 class="h3">Возникли проблемы?</h3>
            <div class="text">Напишите нам и мы поможем:</div>
        </div>
        <!-- end .head-->
        <div class="wrap">

            <div class="text" id="copy-email">{{ supportEmail }}</div>

            <button class="btn btn-simple js_copy" @click="copyToClipboard(supportEmail)" ref="tooltipButton">

                <svg width="24" height="24">
                    <use xlink:href="/img/sprite.svg#copy"></use>
                </svg>
                <svg class="copied" width="24" height="24">
                    <use xlink:href="/img/sprite.svg#copy-active"></use>
                </svg>
            </button>

        </div>
        <!-- end .wrap-->
    </div>
    <!-- end .help-->
</template>
