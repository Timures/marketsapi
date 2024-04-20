<script setup lang="ts">
import { account } from "@/utils/appwrite";
import { ref, computed } from 'vue';

const props = defineProps<{ onClose?: () => void }>();

const oldPassword = ref('');
const password = ref('');
const repeatPassword = ref('');
// is errors
const isOldPasswordInvalid = ref(false);
const isNewPasswordInvalid = ref(false);
const isRepeatPasswordInvalid = ref(false);

const validateOldPassword = () => {
    isOldPasswordInvalid.value = oldPassword.value.length < 4;
};

const validateNewPassword = () => {
    isNewPasswordInvalid.value = password.value.length < 4;
};

const validateRepeatPassword = () => {
    isRepeatPasswordInvalid.value = password.value !== repeatPassword.value;
};

const handleChangePassword = async () => {
    try {
        await account.updatePassword(password.value, oldPassword.value);
        // Clear form fields after successful password change
        oldPassword.value = '';
        password.value = '';
        repeatPassword.value = '';
        // Emit close event to close the modal after successful password change
        props.onClose && props.onClose();
    } catch (error) {
        isOldPasswordInvalid.value = true;
    }
};

// Check if form is invalid (old password is empty, new passwords don't match, or new password is too short)
const isFormInvalid = computed(() => {
    return isOldPasswordInvalid.value || isNewPasswordInvalid.value || isRepeatPasswordInvalid.value;
});
</script>

<template>
    <div class="modal-head">
        <h2 class="h3">Сменить пароль</h2>
    </div>
    <!-- end .modal-head-->
    <form @submit.prevent="handleChangePassword">
        <div class="form-el">
            <div class="form-label">Старый пароль</div>
            <input class="input" type="password" v-model="oldPassword" @input="validateOldPassword">
            <div class="form-subtext red" v-if="isOldPasswordInvalid">Пароль не верный</div>
        </div>
        <!-- end .form-el-->
        <div class="form-el">
            <div class="form-label">Новый пароль</div>
            <input class="input" type="password" v-model="password" @input="validateNewPassword">
            <div class="form-subtext red" v-if="isNewPasswordInvalid">Пароль должен быть более 4 символов</div>
        </div>
        <!-- end .form-el-->
        <div class="form-el">
            <div class="form-label">Повторите новый пароль</div>
            <input class="input" type="password" v-model="repeatPassword" @input="validateRepeatPassword">
            <div class="form-subtext red" v-if="isRepeatPasswordInvalid">Пароли не совпадают</div>
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

