<script setup lang="ts">
import { onBeforeMount } from 'vue'
// import { usePlansStore } from '@/store/plans.store.ts'
// import { useFaqStore } from '@/store/faq.store.ts'
import { useServersStore } from '@/store/servers.store'

onBeforeMount(async () => {
	const serversStore = useServersStore();
  await serversStore.fetchServers(); // Загрузка серверов и установка по умолчанию

});

</script>

<template>
    <div class="content">
				<div class="container">
					<CommonDable />
						<!-- <MainHero /> -->
						<!-- end .hero-->
						<!-- <MainTable /> -->
						<!-- end .table-->
						<!-- <MainPlans /> -->
						<!-- end .plans-->
						<!-- <MainFaq /> -->
						<!-- end .faq--> 
				</div>
				<!-- end .container--> 
		</div>
		<!-- end .content-->
</template>
~/store/servers.store