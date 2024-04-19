import { defineStore } from "pinia"
import { Query } from "appwrite";
import { DB } from "~/utils/appwrite";
import { DB_ID, COLLECTION_USERS } from "~/app.constants";

interface IAuthStore {
    $id: string,
    email: string,
    name: string,
    status: boolean
}

interface IProfile {
    user_id: string,
    name: string,
    email: string,
    tariff: object,
    requests: number,
    used_requests: number,
    type: string,
    key: string,
    key_days: number
}

const defaultValue: { user: IAuthStore, profile: IProfile } = {
    user: {
        $id: '',
        email: '',
        name: '',
        status: false
    },
    profile: {
        user_id: '',
        name: '',
        email: '',
        tariff: {},
        requests: 0,
        used_requests: 0,
        type: '',
        key: '',
        key_days: 0
    }
}

export const useAuthStore = defineStore('auth', {
    state: () => defaultValue,

    getters: {
        isAuth: state => state.user.status,
        getCurrentTariff() {
            this.profile.tariff
        },
        getUserKey(): string {
            return this.profile.key
        },
        getKeyExpired(): number {
            return this.profile.key_days
        },
        getRequestValue(): number {
            return this.profile.requests
        },
        getRequestUsed(): number {
            return this.profile.used_requests
        }
    },
    actions: {
        clear(){
            this.$patch(defaultValue)
        },
        set(input: IAuthStore){
            this.$patch({ user: input })
        },
        async fetchProfile() {
            try {
              const response = await DB.listDocuments(DB_ID, COLLECTION_USERS,[
                Query.equal('userId', this.user.$id)
            ]);
              this.profile = response.documents[0]; // Обновляем массив планов данными из запроса
              console.log('response profile ', this.user.$id)
            } catch (error) {
              console.error(error); // Обрабатываем возможные ошибки
            }
          },
    }
})

export const useIsLoadingStore = defineStore('isLoading', {
    state: () => ({
        isLoading: true,
    }),
    actions: {
        set(data: boolean) {
            this.$patch({isLoading: data })
        }
    }
})