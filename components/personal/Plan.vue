<script setup lang="ts">
import { useAuthStore } from '#imports';
const authStore = useAuthStore()
/** Change Plan Modal */
const modalChangePlanStatus = ref<boolean>(false)

const handleChangePlanModal = () => {
    modalChangePlanStatus.value = true
}

/** Buy Requests Modal */
const modalBuyRequestsStatus = ref<boolean>(false)

const handleBuyRequestsModal = () => {
    modalBuyRequestsStatus.value = true
}

const closeModal = () => {
    if(modalChangePlanStatus.value) { modalChangePlanStatus.value = false }
    if(modalBuyRequestsStatus.value) { modalBuyRequestsStatus.value = false }
}

const currentTariff = computed(() => ({
    name: authStore.getCurrentTariff.name,
    updated: authStore.getCurrentTariffUpdated,
    icon: authStore.getCurrentTariff.icon,
}));

</script>

<template>
    <div class="block plan">
        <div class="head">
            <img :src="currentTariff.icon" alt="" />
            <h3 class="h1">{{ currentTariff.name }}</h3>
            <div class="txt">Ваш тариф с {{  currentTariff.updated }}</div>
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
            <button class="btn btn-big btn-pink-black js_modal" @click="handleChangePlanModal">
                <span>Сменить тариф</span>
            </button>
            <button class="btn btn-big btn-grey js_modal" @click="handleBuyRequestsModal">
                <span>Докупить запросы</span>
            </button>
        </div>
        <!-- end .btns-->
    </div>
    <!-- end .plan-->
    <CommonModal class="modal-plan":is-open="modalChangePlanStatus" @close="modalChangePlanStatus = false">
        <PersonalChangePlan :on-close="closeModal" />
    </CommonModal>
    <!-- end personal change plan modal -->
    <CommonModal class="modal-plan":is-open="modalBuyRequestsStatus" @close="modalBuyRequestsStatus = false">
        <PersonalBuyRequests :on-close="closeModal" />
    </CommonModal>
</template>

<style lang="scss" scoped></style>