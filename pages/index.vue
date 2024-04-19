<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { usePlansStore } from '@/store/plans.store'
import { useFaqStore } from '@/store/faq.store'
import { useServersStore } from '@/store/servers.store'
const dataLoadedPlans = ref(false)
const dataLoadedFaq = ref(false)
const dataLoadedServers = ref(false)
onBeforeMount(async () => {
	const serversStore = useServersStore();
	await serversStore.fetchServers(); // Загрузка серверов и установка по умолчанию
	dataLoadedServers.value = true;

	const plansStore = usePlansStore()
	await plansStore.fetchPlans();
	dataLoadedPlans.value = true;

	const faqStore = useFaqStore()
	await faqStore.fetchFaq()
	dataLoadedFaq.value = true;


});

</script>

<template>
	<div class="content">
		<div class="container">
			<MainHero />
			<!-- end .hero-->
			<Transition name="fade">
				<CommonDable v-show="dataLoadedServers" />
			</Transition>
			<!-- end .table-->
			<Transition name="fade">
				<MainPlans v-show="dataLoadedPlans" />
			</Transition>
			<!-- end .plans-->
			<Transition name="fade">
				<MainFaq v-show="dataLoadedFaq" />
			</Transition>
			<!-- end .faq-->
		</div>
		<!-- end .container-->
	</div>
	<!-- end .content-->
</template>