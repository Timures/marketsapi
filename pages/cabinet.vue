<script setup lang="ts">
import { account } from '@/utils/appwrite'
import { useAuthStore } from "@/store/auth.store";
import { usePlansStore } from '~/store/plans.store'

const store = useAuthStore()
const router = useRouter()
const isLoaded = ref(false)

onMounted(async () => {
	try {
		isLoaded.value = true
		const user = await account.get()
		if (user) store.set(user)
		// console.log('user is ', user);
		store.fetchProfile()

		const plansStore = usePlansStore()    	
		await plansStore.fetchPlans();
		
		isLoaded.value = false
	} catch (error) {
		router.push('/login')
		isLoaded.value = false
	} finally {
		// isLoadingStore.set(false)
		isLoaded.value = false
	}
})
</script>

<template>
	<div class="content">
		<div class="container">
			<LayoutLoader v-show="isLoaded" />
			<Transition name="fade">
				<div class="personal" v-show="!isLoaded">
				<PersonalPlan />
				<PersonalKey />
				<PersonalRequests />
				<PersonalExpired />
				<PersonalProlong />
				<PersonalSupport />
			</div>
			</Transition>
			
			<!-- end .personal-->
		</div>
		<!-- end .container-->
	</div>
</template>