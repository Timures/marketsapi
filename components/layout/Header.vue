<script lang="ts" setup>
import { account } from '@/utils/appwrite'
import { useAuthStore } from "@/store/auth.store";
const store = useAuthStore()
const router = useRouter()

const logout = async() => {
  await account.deleteSession('current')
  store.clear()
  await router.push('/login')
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
        <ul v-show="!store.isAuth">
          <li>
            <a class="btn btn-grey btn-small" href="#"
              ><span>Войти в кабинет</span></a
            >
          </li>
        </ul>

        <ul v-show="store.isAuth">
										<li><a class="btn btn-grey btn-small js_modal" href="#change-password"><span>Сменить пароль</span></a></li>
										<li><button class="btn btn-grey-red btn-small" @click="logout"><span>Выйти</span></button></li>
								</ul>
      </nav>
      <!-- end .menu-->
    </div>
    <!-- end .container-->
  </header>
  <!-- end .header-->
</template>
