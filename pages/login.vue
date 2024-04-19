<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore, useIsLoadingStore } from "@/store/auth.store";
import { account } from '@/utils/appwrite.ts'

useSeoMeta({
  title: "Login | MarketApi",
});

const emailRef = ref("");
const passwordRef = ref("");

const authStore = useAuthStore();
const router = useRouter();

const login = async () => {
	
  await account.createEmailSession(emailRef.value, passwordRef.value);
  const response = await account.get();
  console.log('lgin ', response.$id)
  if (response) {
    authStore.set({
      email: response.email,
      name: response.name,
      status: response.status,
      user_id: response.$id
    });
  }

  emailRef.value = '',
  passwordRef.value = ''

  await router.push('/cabinet')
};


</script>

<template>
  <div class="content">
    <div class="container">
      <div class="login bg-login">
        <div class="block">
          <h1 class="h1">Вход</h1>
          <div>
            <div class="form-el">
              <div class="form-label">Электронная почта</div>
              <input
                class="input"
                placeholder="mail@example.com"
                type="email"
                v-model="emailRef"
              />
              <div class="form-subtext red">
                Такая почта не зарегистрирована
              </div>
            </div>
            <!-- end .form-el-->
            <div class="form-el">
              <div class="form-label">Пароль</div>
              <input class="input" type="password" v-model="passwordRef" />
              <div class="form-subtext red">Неверный пароль</div>
            </div>
            <!-- end .form-el-->
            <div class="form-btns">
              <button class="btn btn-big btn-pink-black" @click="login"><span>Войти</span></button>
              <a class="btn btn-big btn-grey"><span>Забыл пароль</span></a>
            </div>
            <!-- end .form-btns-->
		</div>
        </div>
        <!-- end .block-->
        <div class="block first-time">
          <h2 class="h2">Впервые на сайте?</h2>
          <div class="text">Выберите тариф и зарегистрируйтесь</div>
          <a class="btn btn-grey" href="/"><span>Выбрать тариф</span></a>
        </div>
        <!-- end .first-time-->
      </div>
      <!-- end .login-->
    </div>
    <!-- end .container-->
  </div>
  <!-- end .content-->
</template>
