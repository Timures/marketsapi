<script setup lang="ts">

import { usePlansStore } from '@/store/plans.store'
import { useFaqStore } from '@/store/faq.store'
import { useServersStore } from '@/store/servers.store'

useSeoMeta({
	title: "Главная | MarketApi",
});

const serversStore = useServersStore();
const plansStore = usePlansStore()
const faqStore = useFaqStore()

const dataLoadedPlans = ref(false)
const dataLoadedFaq = ref(false)
const dataLoadedServers = ref(false)

onMounted(async () => {
	await Promise.all([
		serversStore.fetchServers(),
		plansStore.fetchPlans(),
		faqStore.fetchFaq()
	])

	dataLoadedServers.value = true;
	dataLoadedPlans.value = true;
	dataLoadedFaq.value = true;

});

</script>

<template>
	<div class="content">
			<div class="container">

				<MainHero />

				<!-- end .hero-->

				<CommonDable />

				<!-- end .table-->
				<MainPlans />

				<!-- end .plans-->

				<MainFaq />

				<!-- end .faq-->

			</div>
		<!-- end .container-->
	</div>
	<!-- end .content-->
</template>