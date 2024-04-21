<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { account } from "@/utils/appwrite";
import { v4 as uuid } from "uuid"

useSeoMeta({
  title: "Регистрация | MarketApi",
});

const emailRef = ref("");
const passwordRef = ref("");
const passwordRepeatRef = ref("");
const typeRef = ref("physical");
const agreeWithPersonalData = ref(false);
const router = useRouter();

const register = async () => {
  try {
    await account.create(
      uuid(),
      emailRef.value,
      passwordRef.value,
      typeRef.value
    );

    emailRef.value = '';
    passwordRef.value = '';
    await router.push('/login');
  } catch (error) {
    isUserEmailInvalid.value = true;
    console.log('Error on registration: ', error);
  }
};

const isUserEmailInvalid = ref(false);

const validateUserEmail = () => {
  isUserEmailInvalid.value = !isValidEmail(emailRef.value);
};

const isFormInvalid = computed(() => {
  return (
    !emailRef.value ||
    !isValidEmail(emailRef.value) ||
    !agreeWithPersonalData.value ||
    passwordRef.value.length < 5 ||
    passwordRef.value !== passwordRepeatRef.value
  );
});

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/** Restore Password Modal */
const modalRestorePasswordStatus = ref<boolean>(false)
const handleRestorePassword = () => {  
  modalRestorePasswordStatus.value = true
}
const closeRestorePassword = () => {
  modalRestorePasswordStatus.value = false
}
</script>

<template>
  <div class="content">
    <div class="container">
      <div class="login bg-reg">
        <div class="block">
          <h1 class="h1">Регистрация</h1>
          <div class="form-el">
            <div class="form-label">Тип аккаунта:</div>
            <div class="form-checks-hor">
              <label>
                <input type="radio" v-model="typeRef" value="physical" checked />
                <span class="btn btn-small btn-grey"><span>Физическое лицо</span></span>
              </label>
              <label>
                <input type="radio" v-model="typeRef" value="legal" />
                <span class="btn btn-small btn-grey"><span>Юридическое лицо</span></span>
              </label>
            </div>
          </div>
          <div class="form-el">
            <div class="form-label">Электронная почта</div>
            <input class="input" v-model="emailRef" placeholder="mail@example.com" type="email" @input="validateUserEmail" />
            <div class="form-subtext red" v-show="isUserEmailInvalid">Такая почта уже зарегистрирована</div>
          </div>
          <div class="form-el">
            <div class="form-label">Пароль</div>
            <input class="input" type="password" v-model="passwordRef" />
            <div class="form-subtext red" v-show="passwordRef.length < 5">Пароль должен быть более 4 символов</div>
          </div>
          <div class="form-el">
            <div class="form-label">Повторите пароль</div>
            <input class="input" v-model="passwordRepeatRef" type="password" />
            <div class="form-subtext red" v-show="passwordRef !== passwordRepeatRef">Пароли не совпадают</div>
          </div>
          <div class="form-checks-vert">
            <label>
              <input type="checkbox" v-model="agreeWithPersonalData" />
              <span class="checkbox"></span>Я согласен с <a href="#">политикой обработки персональных данных</a>
            </label>
          </div>
          <div class="form-btns">
            <button class="btn btn-big btn-pink-black" @click="register" :disabled="isFormInvalid">
              <span>Регистрация</span>
            </button>
            <button class="btn btn-big btn-grey" @click="handleRestorePassword">
              <span>Забыл пароль</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <CommonModal :is-open="modalRestorePasswordStatus" @close="modalRestorePasswordStatus = false">
    <PersonalRestorePassword :on-close="closeRestorePassword" />
  </CommonModal>
  </div>
</template>
