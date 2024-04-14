<script setup lang="ts">
import { onMounted } from 'vue'
import { usePlansStore } from '@/store/plans.store.ts'
import { useFaqStore } from '@/store/faq.store.ts'
import { useResponseStore } from '@/store/response.store'
import { useMainApiStore } from '@/store/api.store'

onMounted(() => {
  const plansStore = usePlansStore()
  plansStore.fetchPlans()

  const faqStore = useFaqStore()
  faqStore.fetchFaq()

  const mainApiStore = useMainApiStore()
  mainApiStore.fetchMainApi()

//   const responseStore = useResponseStore()
//   responseStore.fetchResponses()
})

</script>

<template>
    <div class="content">
				<div class="container">
					<CommonSable />
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
