<script setup lang="ts">
import { onMounted } from 'vue'
import { usePlansStore } from '@/store/plans.store.ts'

onMounted(() => {
  const plansStore = usePlansStore()
  plansStore.fetchPlans()
})

</script>

<template>
    <div class="content">
				<div class="container">
						<MainHero />
						<!-- end .hero-->
						<!-- <MainTable /> -->
						<!-- end .table-->
						<MainPlans />
						<!-- end .plans-->
						<!-- <MainFaq /> -->
						<!-- end .faq--> 
				</div>
				<!-- end .container--> 
		</div>
		<!-- end .content-->
</template>