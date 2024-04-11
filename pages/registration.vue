<script setup lang="ts">
import { ref } from "vue";
import { account } from "@/utils/appwrite.ts";
import { useAuthStore } from "@/store/auth.store";
import { v4 as uuid } from "uuid";

useSeoMeta({
  title: "Registration | MarketApi",
});

const emailRef = ref("");
const passwordRef = ref("");
const passwordRepeatRef = ref("");
const typeRef = ref("");


const authStore = useAuthStore();
const router = useRouter()

const login = async () => {
	
  await account.createEmailSession(emailRef.value, passwordRef.value);
  const response = await account.get();

  
  if (response) {
    authStore.set({
      email: response.email,
      name: response.name,
      status: response.status,
    });
  }

  emailRef.value = '',
  passwordRef.value = ''

  await router.push('/')
};

const register = async () => {
  await account.create(
    uuid(),
    emailRef.value,
    passwordRef.value,
    typeRef.value
  );

  await login()
};
</script>

<template>
  <div class="content">
    <div class="container">
      <div class="login bg-reg">
        <div class="block">
          <h1 class="h1">Регистрация</h1>
          <div>
            <div class="form-el">
              <div class="form-label">Тип аккаунта:</div>
              <div class="form-checks-hor">
                <label>
                  <input type="radio" v-model="typeRef" name="type" checked />
                  <span class="btn btn-small btn-grey"
                    ><span>Физическое лицо</span></span
                  ></label
                >
                <label>
                  <input type="radio" v-model="typeRef" name="type" />
                  <span class="btn btn-small btn-grey"
                    ><span>Юридическое лицо</span></span
                  ></label
                >
              </div>
              <!-- end .form-checks-hor-->
            </div>
            <!-- end .form-el-->
            <div class="form-el">
              <div class="form-label">Электронная почта</div>
              <input
                class="input"
                v-model="emailRef"
                placeholder="mail@example.com"
                type="email"
              />
              <div class="form-subtext red">
                Такая почта уже зарегистрирована
              </div>
            </div>
            <!-- end .form-el-->
            <div class="form-el">
              <div class="form-label">Пароль</div>
              <input
                class="input"
                type="password"
                v-model="passwordRef"
              />
              <div class="form-subtext red" v-show="passwordRef.length < 5">
                Пароль должен быть более 4 символов
              </div>
            </div>
            <!-- end .form-el-->
            <div class="form-el">
              <div class="form-label">Повторите пароль</div>
              <input
                class="input"
                v-model="passwordRepeatRef"
                type="password"
              />
              <div class="form-subtext red" v-show="passwordRef !== passwordRepeatRef">Пароли не совпадают</div>
            </div>
            <!-- end .form-el-->
            <div class="form-checks-vert">
              <label>
                <input type="checkbox" />
                <span class="checkbox"></span>Я согласен с
                <a href="#">политикой обработки персональных данных</a></label
              >
            </div>
            <!-- end .form-checks-vert-->
            <div class="form-btns">
              <button class="btn btn-big btn-pink-black" @click="register"><span>Войти</span></button>
              <a class="btn btn-big btn-grey"><span>Забыл пароль</span></a>
            </div>
            <!-- end .form-btns-->
		</div>
        </div>
        <!-- end .block-->
      </div>
      <!-- end .login-->
    </div>
    <!-- end .container-->
  </div>
</template>
