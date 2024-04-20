<script setup lang="ts">
import { useAuthStore } from '#imports';
const authStore = useAuthStore()
/** Change Plan Modal */
const modalChangePlanStatus = ref<boolean>(false)

const handleChangePlan = () => {
    modalChangePlanStatus.value = true
}

const closeChangePlan = () => {
    modalChangePlanStatus.value = false
}

</script>

<template>
    <div class="block plan">
        <div class="head">
            <img :src="authStore.getCurrentTariff.icon" alt="" />
            <h3 class="h1">{{ authStore.getCurrentTariff.name }}</h3>
            <div class="txt">Ваш тариф с {{  authStore.getCurrentTariffUpdated }}</div>
        </div>
        <!-- end .head-->
        <div class="detail">1000 запросов в сутки<span class="pic-help"
                data-tippy-content="Неофициальный API интерфейс с актуальными, а так же историческими данными для ваших систем."></span>
        </div>
        <!-- end .detail-->
        <div class="text">При расчёте платы за содержание и ремонт общего имущества дома управляющая
            организация исходит из тарифа за один квадратный метр общей.</div>
        <!-- end .text-->
        <div class="btns">
            <button class="btn btn-big btn-pink-black js_modal" @click="handleChangePlan">
                <span>Сменить тариф</span>
            </button>
            <button class="btn btn-big btn-grey js_modal" href="#buy-requests">
                <span>Докупить запросы</span>
            </button>
        </div>
        <!-- end .btns-->
    </div>
    <!-- end .plan-->
    <CommonModal class="modal-plan":is-open="modalChangePlanStatus" @close="modalChangePlanStatus = false">
        <PersonalChangePlan :on-close="closeChangePlan" />
    </CommonModal>
</template>

<style lang="scss" scoped></style>