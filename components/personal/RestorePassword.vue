<script setup lang="ts">
import { account } from "@/utils/appwrite";
import { ref, computed } from 'vue';
const router = useRouter();
const props = defineProps<{ onClose?: () => void }>();

const userEmail = ref('');
// is errors
const isUserEmailInvalid = ref(false);

const validateUserEmail = () => {
    isUserEmailInvalid.value = !isValidEmail(userEmail.value);
}


const handleChangePassword = async () => {
    try {
        // await account.restorePassword(userEmail.value);
        // Clear form fields after successful password change
        userEmail.value = '';
        console.log('restore password', userEmail.value)
        // Emit close event to close the modal after successful password change
        props.onClose && props.onClose();
        await router.push('/')
    } catch (error) {
        isUserEmailInvalid.value = true;
    }
};

// Check if form is invalid (old password is empty, new passwords don't match, or new password is too short)
const isFormInvalid = computed(() => {
    return !userEmail.value || !isValidEmail(userEmail.value);
});

const isValidEmail = (email: string) => {
  // Простая проверка с использованием регулярного выражения
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
</script>

<template>
    <div class="modal-head">
        <h2 class="h3">Восстановить пароль</h2>
    </div>
    <!-- end .modal-head-->
    <form @submit.prevent="handleChangePassword">
        <div class="form-el">
            <div class="form-label">Ваш email</div>
            <input class="input" type="email" v-model="userEmail" @input="validateUserEmail">
            <div class="form-subtext red" v-if="isUserEmailInvalid">Email не подходит</div>
        </div>
        <!-- end .form-el-->
        <div class="form-btns">
            <button class="btn btn-big btn-pink-black" type="submit" :disabled="isFormInvalid">
                <span>Сменить пароль</span>
            </button>
        </div>
        <!-- end .form-btns-->
    </form>
</template>

