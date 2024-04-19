<script lang="ts" setup>
import { account } from "@/utils/appwrite";
import { useAuthStore } from "@/store/auth.store";
import ChangePassword from '@/components/personal/ChangePassword.vue'
const store = useAuthStore();
const router = useRouter();

const logout = async () => {
  await account.deleteSession("current");
  store.clear();
  await router.push("/login");
};

/** Change Password Modal */
const modalChangePasswordStatus = ref<boolean>(false)
const handleChangePassword = () => {
  
  modalChangePasswordStatus.value = true
}
const closeChangePassword = () => {
  modalChangePasswordStatus.value = false
}
</script>

<template>
  <header class="header">
    <div class="container">
      <a class="logo" href="/"><img src="/img/logo.svg" alt="MarketsAPI" /></a>
      <div class="toggle-menu btn btn-grey" title="Меню">
        <svg width="24" height="24">
          <use xlink:href="/img/sprite.svg#menu"></use>
        </svg>
      </div>
      <div class="menu-fader"></div>
      <nav class="menu">
        <ul>
          <li>
            <a class="btn btn-grey btn-small" href="#"
              ><span>Endpoints / Методы</span></a
            >
          </li>
          <li>
            <a class="btn btn-grey btn-small" href="#"><span>Цены</span></a>
          </li>
          <li>
            <a class="btn btn-grey btn-small" href="#"
              ><span>Поддержка</span></a
            >
          </li>
        </ul>

        <ul v-if="!store.isAuth">
          <li>
            <a class="btn btn-grey btn-small" href="/login">
              <span>Войти в кабинет</span>
            </a>
          </li>
        </ul>

        <ul v-else="store.isAuth">
          <li>
            <button class="btn btn-grey btn-small js_modal" @click="handleChangePassword">
              <span>Сменить пароль</span>
            </button>
          </li>
          <li>
            <button class="btn btn-grey-red btn-small" @click="logout">
              <span>Выйти</span>
            </button>
          </li>
        </ul>
      </nav>
      <!-- end .menu-->
    </div>
    <!-- end .container-->
  </header>
  <!-- end .header-->
  <CommonModal :is-open="modalChangePasswordStatus" @close="modalChangePasswordStatus = false">
    <ChangePassword :on-close="closeChangePassword" />
  </CommonModal>
</template>
