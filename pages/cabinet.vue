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
				<div class="block prolong">
					<h3 class="h3">Продлить тариф</h3>
					<div class="row">
						<div class="wrap">
							<div class="swiper prolong-slider">
								<div class="swiper-wrapper">
									<div class="swiper-slide">
										<div>1 месяц за 3500 ₽</div>
									</div>
									<!-- end .swiper-slide-->
									<div class="swiper-slide">
										<div>3 месяца за 9 500 ₽</div>
										<div class="small blue">выгода 100₽</div>
									</div>
									<!-- end .swiper-slide-->
									<div class="swiper-slide">
										<div>6 месяцев за 18 900 ₽</div>
										<div class="small blue">выгода 2100₽</div>
									</div>
									<!-- end .swiper-slide-->
									<div class="swiper-slide">
										<div>12 месяцев за 38 500 ₽</div>
										<div class="small blue">выгода 3500₽</div>
									</div>
									<!-- end .swiper-slide-->
								</div>
								<!-- end .swiper-wrapper-->
							</div>
							<!-- end .prolong-slider-->
							<div class="btn prolong-slider-minus">
								<svg width="32" height="32">
									<use xlink:href="/img/sprite.svg#remove"></use>
								</svg>
							</div>
							<div class="btn prolong-slider-plus">
								<svg width="32" height="32">
									<use xlink:href="/img/sprite.svg#add"></use>
								</svg>
							</div>
						</div>
						<!-- end .wrap-->

						<div class="btn btn-pink-black btn-big"><span>Продлить тариф</span></div>
					</div>
					<!-- end .row-->
				</div>
				<!-- end .prolong-->
				<div class="block help">
					<div class="head">
						<h3 class="h3">Возникли проблемы?</h3>
						<div class="text">Напишите нам и мы поможем:</div>
					</div>
					<!-- end .head-->
					<div class="wrap">
						<div class="text" id="copy-email">teh@marketsapi.ru</div>
						<div class="btn btn-simple js_copy" data-tippy-content="Почта скопирована"
							data-href="#copy-email">
							<svg width="24" height="24">
								<use xlink:href="/img/sprite.svg#copy"></use>
							</svg>
							<svg class="copied" width="24" height="24">
								<use xlink:href="/img/sprite.svg#copy-active"></use>
							</svg>
						</div>
					</div>
					<!-- end .wrap-->
				</div>
				<!-- end .help-->
			</div>
			<!-- end .personal-->
		</div>
		<!-- end .container-->
	</div>
</template>