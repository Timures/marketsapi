<script setup lang="ts">
import { useAuthStore } from "@/store/auth.store";
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

</script>

<template>
	<div class="block key">
		<h3 class="h3">Ваш ключ:</h3>
		<div class="row">
			<div class="wrap-input">
				<input class="input" id="copy-key" type="text" v-model="store.getUserKey" readonly>
			</div>
			<div class="btn-tippy">
				<transition name="fade">
					<div class="tippy" v-show="copyStatus">
						<div class="bubble">Код скопирован</div>
					</div>
				</transition>

				<button class="btn btn-big btn-grey js_copy" @click="copyToClipboard(store.getUserKey)"><span
						v-show="!copyStatus">Скопировать</span>
					<span v-show="copyStatus">Скопировано</span>
				</button>
			</div>

		</div>
		<!-- end .row-->
	</div>
	<!-- end .key-->
</template>

<style lang="scss" scoped>

.btn-tippy {
  position: relative;
}

.tippy {
  position: absolute;
  top: -55%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 16px;
  color: #000;
  min-width: 150px;
  width: 100%;
  

}

.bubble {
  position: relative;
  padding: 4px 8px;
  background: #fff;
  -webkit-border-radius: 16px;
  -moz-border-radius: 16px;
  border-radius: 16px;
  text-align: center;
  box-shadow: -1px 1px 14px -1px rgba(0,0,0,0.71);
}

.bubble:after {
  content: '';
  position: absolute;
  border-style: solid;
  border-width: 8px 8px 0;
  border-color: #fff transparent;
  display: block;
  width: 0;
  z-index: 1;
  margin-left: -8px;
  bottom: -8px;
  left: 50%;
}
</style>