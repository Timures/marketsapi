<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore, useIsLoadingStore } from "@/store/auth.store";
import { account } from '@/utils/appwrite'

useSeoMeta({
  title: "Войти | MarketApi",
});

const emailRef = ref("");
const passwordRef = ref("");

const authStore = useAuthStore();
const router = useRouter();

const login = async () => {

  // Проверка на ввод email и пароля
 

  if(CheckValidEmail && CheckValidPassword){
    try {
    
    await account.createEmailSession(emailRef.value, passwordRef.value);
    const response = await account.get();
    if (response) {
      authStore.set({
        email: response.email,
        name: response.name,
        status: response.status,
        $id: response.$id
      });
      emailRef.value = '';
      passwordRef.value = '';

      await router.push('/cabinet');
    }
  } catch (error) {
    errorLogin.value = true
    // console.log('login error ', error)
   // Установка значения errorLogin.value в false через 2 секунды
   setTimeout(() => {
      errorLogin.value = false;
    }, 2000);
    // alert("Ошибка входа. Пожалуйста, проверьте правильность введенных данных.");
  }
  }

  
};

/** Restore Password Modal */
const modalRestorePasswordStatus = ref<boolean>(false)
const handleRestorePassword = () => {  
  modalRestorePasswordStatus.value = true
}
const closeRestorePassword = () => {
  modalRestorePasswordStatus.value = false
}

/** Проверки */
const errorMessage = 'Ошибка входа. Пожалуйста, проверьте правильность введенных данных.'
const errorLogin = ref(false)
const CheckValidEmail = computed(() => {
  return !isValidEmail(emailRef.value) && emailRef.value.length > 2;
})

const CheckValidPassword = computed(() => {
  return passwordRef.value.length < 3; 
})
const isValidEmail = (email: string) => {
  // Простая проверка с использованием регулярного выражения
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

</script>

<template>
  <div class="content">
    <div class="container">
      <div class="login bg-login">
        <div class="block">
          <h1 class="h1">Вход</h1>
          <transition name="fade">
            <p v-show="errorLogin" class="red form-subtext">
            {{ errorMessage }}
          </p>
          </transition>
          <div>
            <div class="form-el">
              <div class="form-label">Электронная почта</div>
              <input
                class="input"
                placeholder="mail@example.com"
                type="email"
                v-model="emailRef"
              />
              <div v-show="CheckValidEmail" class="form-subtext red">
                Такая почта не зарегистрирована
              </div>
            </div>
            <!-- end .form-el-->
            <div class="form-el">
              <div class="form-label">Пароль</div>
              <input class="input" type="password" v-model="passwordRef" />
              <div v-show="CheckValidPassword" class="form-subtext red">Неверный пароль</div>
            </div>
            <!-- end .form-el-->
            <div class="form-btns">
              <button class="btn btn-big btn-pink-black" @click="login" :disabled="CheckValidEmail || CheckValidPassword">
                <span>Войти</span>
              </button>
              <button class="btn btn-big btn-grey" @click="handleRestorePassword"><span>Забыл пароль</span></button>
            </div>
            <!-- end .form-btns-->
		</div>
        </div>
        <!-- end .block-->
        <div class="block first-time">
          <h2 class="h2">Впервые на сайте?</h2>
          <div class="text">Выберите тариф и зарегистрируйтесь</div>
          <NuxtLink class="btn btn-grey" to="/"><span>Выбрать тариф</span></NuxtLink>
        </div>
        <!-- end .first-time-->
      </div>
      <!-- end .login-->
    </div>
    <!-- end .container-->
    <CommonModal :is-open="modalRestorePasswordStatus" @close="modalRestorePasswordStatus = false">
    <PersonalRestorePassword :on-close="closeRestorePassword" />
  </CommonModal>
  </div>
  
</template>
