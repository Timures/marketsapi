<script setup lang="ts">
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
</script>

<template>
    <div class="block help">
        <div class="head">
            <h3 class="h3">Возникли проблемы?</h3>
            <div class="text">Напишите нам и мы поможем:</div>
        </div>
        <!-- end .head-->
        <div class="wrap support-copy">

            <div class="text" id="copy-email">{{ supportEmail }}</div>
            <div class="tippy-wrap">
                <transition name="fade">
                    <div class="tippy" v-show="copyStatus">
                        <div class="bubble">{{ copyText }}</div>
                    </div>
                </transition>
            <button class="btn btn-simple js_copy" @click="copyToClipboard(supportEmail)">
                
                <svg width="24" height="24">
                    <use xlink:href="/img/sprite.svg#copy"></use>
                </svg>
                <svg class="copied" width="24" height="24">
                    <use xlink:href="/img/sprite.svg#copy-active"></use>
                </svg>
            </button>
            </div>

        </div>
        <!-- end .wrap-->
    </div>
    <!-- end .help-->
</template>

<style lang="scss" scoped>
.support-copy {
    display: flex;
    justify-content: space-between;
    align-items: center
}
@media only screen and (min-width: 700px){
    .personal .help .wrap {
    flex: 1 0 auto;
    max-width: 643px;
    font-size: 32px;
    padding: 0 0 0 18px;
}
}


.personal .help .wrap .btn {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    padding: 0;
    aspect-ratio: 1 / 1;
    color: var(--pink);
    /* width: 50px; */
    height: 50px;
}
.tippy-wrap {
    position: relative;
    width: 50px;
    height: 50px;
    max-width: 50px;
    max-height: 50px;
}

.tippy {
    position: absolute;
    top: -60%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 14px;
    font-weight: normal;
    color: #000;
    min-width: 190px;
    width: auto;
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