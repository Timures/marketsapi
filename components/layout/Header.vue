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

/** Toogle mobile menu */
const isMobMenuOpen = ref(false)
const handleToggleMenu = (anchor:string | null) => {
  isMobMenuOpen.value = !isMobMenuOpen.value
  const offset = ref(-100);
  // Скролл к якорю
  if(anchor) {
    setTimeout(() => {
    const element = document.getElementById(anchor); // Замените 'anchorId' на id нужного якоря
    if (element) {
      const offsetPosition = element.offsetTop + offset.value;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
    }
  }, 300); // Время задержки, чтобы скролл произошел после закрытия меню
  }
  
 
}

  // Block body scroll when modal is open
  const blockBodyScroll = () => {
    if (typeof document !== 'undefined' && document.body) {
      document.body.style.overflow = 'hidden';
    }
  };
  
  // Restore body scroll when modal is closed
  const restoreBodyScroll = () => {
    if (typeof document !== 'undefined' && document.body) {
      document.body.style.overflow = 'auto';
    }
  };

    // Close modal when Escape key is pressed
    const handleEscape = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isMobMenuOpen.value) {
      isMobMenuOpen.value = false
    }
  };
  
  // Watch isOpen prop and apply scroll blocking
  watchEffect(() => {
    if (isMobMenuOpen.value) {
      blockBodyScroll();
      window.addEventListener('keydown', handleEscape);
    } else {
      restoreBodyScroll();
    }
  });
  
  // Cleanup on unmount
  onUnmounted(() => {
    restoreBodyScroll();
    window.removeEventListener('keydown', handleEscape); // Ensure window and event listener exist before removing
  });
</script>

<template>
  <header class="header" :class="{'open-menu': isMobMenuOpen}">
    <div class="container">
      <NuxtLink class="logo" href="/">
        <img src="/img/logo.svg" alt="MarketsAPI" />
      </NuxtLink>
      <div class="toggle-menu btn btn-grey" title="Меню" @click="handleToggleMenu()">
        <svg width="24" height="24">
          <use xlink:href="/img/sprite.svg#menu"></use>
        </svg>
      </div>
      <div class="menu-fader" @click="handleToggleMenu()"></div>
      <nav class="menu">
        <ul>
          <li>
            <NuxtLink @click.native="handleToggleMenu('mainTable')" class="btn btn-grey btn-small" to="/">
              <span>Endpoints / Методы</span>
              </NuxtLink>
          </li>
          <li>
            <NuxtLink @click.native="handleToggleMenu('mainPlans')" class="btn btn-grey btn-small" to="/">
              <span>Цены</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink @click.native="handleToggleMenu('mainFaq')" class="btn btn-grey btn-small" to="/">
              <span>Поддержка</span>
            </NuxtLink>
          </li>
        </ul>

        <ul v-if="!store.isAuth">
          <li>
            <NuxtLink @click.native="handleToggleMenu" class="btn btn-grey btn-small" to="/login">
              <span>Войти в кабинет</span>
            </NuxtLink>
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
