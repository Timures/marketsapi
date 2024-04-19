<script setup lang="ts">
const supportEmail = ref('teh@marketsapi.ru')

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

            <button class="btn btn-simple js_copy btn-tippy" @click="copyToClipboard(supportEmail)"
                data-tippy-content="Почта скопирована" data-href="#copy-email">
                <transition name="fade">
                    <div class="tippy" v-show="copyStatus">
                        <div class="bubble">{{ supportEmail }}</div>
                    </div>
                </transition>
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

<style lang="scss" scoped>
.btn-tippy {
    position: relative;
}

.tippy {
    position: absolute;
    top: -55%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 16px;
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
    box-shadow: -1px 1px 14px -1px rgba(0, 0, 0, 0.71);
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