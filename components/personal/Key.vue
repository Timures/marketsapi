<script setup lang="ts">
import { useAuthStore } from "@/store/auth.store";
import { useTippy } from 'vue-tippy'

const store = useAuthStore()

// Create a ref to store the copy status message
const copyStatus = ref<boolean | null>(null);
// Function to copy text to clipboard
const copyToClipboard = (text: string) => {
	navigator.clipboard.writeText(text)
		.then(() => {
			copyStatus.value = true;
			// Hide the copy status after a short delay (e.g., 3 seconds)
			setTimeout(() => {
				copyStatus.value = null;
			}, 1500);
		})
		.catch((error) => {
			console.error('Error copying text:', error);
			// copyStatus.value = 'Ошибка копирования.';
		});
};

const copyText = 'Ключ скопирован'
const tooltipButton = ref<HTMLButtonElement | null>(null);

onMounted(() => {
	if (tooltipButton.value) {
		useTippy(tooltipButton.value, {
			theme: 'light',
			content: copyText,
			delay: 100,
			arrow: true,
			hideOnClick: false,
			onShow(instance) {
				setTimeout(() => {
					instance.hide();
				}, 1000);
			},
			trigger: 'click', // Изменяем триггер на клик
		});
	}
});
</script>

<template>
	<div class="block key">
		<h3 class="h3">Ваш ключ:</h3>
		<div class="row">
			<div class="wrap-input">
				<input class="input" id="copy-key" type="text" v-model="store.getUserKey" readonly>
			</div>

			<button class="btn btn-big btn-grey js_copy" @click="copyToClipboard(store.getUserKey)" ref="tooltipButton">
				<span v-show="!copyStatus">Скопировать</span>
				<span v-show="copyStatus">Скопировано</span>
			</button>

		</div>
		<!-- end .row-->
	</div>
	<!-- end .key-->
</template>