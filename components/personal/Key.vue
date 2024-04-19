<script setup lang="ts">
import { useAuthStore } from "@/store/auth.store";
const store = useAuthStore()
</script>

<template>
<div class="block key">
					<h3 class="h3">Ваш ключ:</h3>
					<div class="row">
						<div class="wrap-input">
							<input class="input" id="copy-key" type="text" v-model="store.getUserKey" readonly>
						</div>
						<div class="btn btn-big btn-grey js_copy" data-tippy-content="Ключ скопирован"
							data-href="#copy-key"><span>Скопировать</span><span class="copied">Скопировано</span></div>
					</div>
					<!-- end .row-->
				</div>
				<!-- end .key-->
</template>