<script setup lang="ts">
import { account } from '@/utils/appwrite'
import { useAuthStore, useIsLoadingStore } from "@/store/auth.store";

const isLoadingStore = useIsLoadingStore()
const store = useAuthStore()
const router = useRouter()
// get users data



onMounted(async () => {
	try {
		const user = await account.get()
		if (user) store.set(user)
		console.log('user is ', user);
		store.fetchProfile()
		console.log('Profile is ', user);
	} catch (error) {
		router.push('/login')
	} finally {
		isLoadingStore.set(false)
	}
})
</script>

<template>
	<div class="content">
		<div class="container">
			<div class="personal">
				<div class="block plan">
					<div class="head"><img src="/img/plans/2.svg" alt="" />
						<h3 class="h1">Basic</h3>
						<div class="txt">Ваш тариф с 22.12.2024</div>
					</div>
					<!-- end .head-->
					<div class="detail">1000 запросов в сутки<span class="pic-help"
							data-tippy-content="Неофициальный API интерфейс с актуальными, а так же историческими данными для ваших систем."></span>
					</div>
					<!-- end .detail-->
					<div class="text">При расчёте платы за содержание и ремонт общего имущества дома управляющая
						организация исходит из тарифа за один квадратный метр общей.</div>
					<!-- end .text-->
					<div class="btns"> <a class="btn btn-big btn-pink-black js_modal" href="#change-plan"><span>Сменить
								тариф</span></a> <a class="btn btn-big btn-grey js_modal"
							href="#buy-requests"><span>Докупить запросы</span></a> </div>
					<!-- end .btns-->
				</div>
				<!-- end .plan-->
				<PersonalKey />
				<PersonalRequests />
				<PersonalExpired />
				<PersonalProlong />
				<PersonalSupport />
			</div>
			<!-- end .personal-->
		</div>
		<!-- end .container-->
	</div>
</template>