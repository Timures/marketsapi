import { defineStore } from "pinia";
import { Query } from "appwrite";
import { DB } from "~/utils/appwrite";
import { DB_ID, COLLECTION_USERS } from "~/app.constants";

interface IAuthStore {
  $id: string;
  email: string;
  name: string;
  status: boolean;
}

interface IProfile {
    $id: string; // document id
  user_id: string;
  name: string;
  email: string;
  tariff: ITariff;
  requests: number;
  used_requests: number;
  type: string;
  key: string;
  key_days: number;
}

interface ITariff {
  $id: string;
  $updatedAt: string; // "2024-04-20T09:07:13.254+00:00"
  name: string;
  desc: string;
  enabled: boolean;
  price: number;
  price_year: number;
  icon: string;
  tariff_level: number;
}

const defaultValue: { user: IAuthStore; profile: IProfile } = {
  user: {
    $id: "",
    email: "",
    name: "",
    status: false,
  },
  profile: {
    $id: '',
    user_id: "",
    name: "",
    email: "",
    tariff: {
      $id: "",
      $updatedAt: "",
      name: "",
      desc: "",
      enabled: true,
      price: 0,
      price_year: 0,
      icon: "",
      tariff_level: 0,
    },
    requests: 0,
    used_requests: 0,
    type: "",
    key: "",
    key_days: 0,
  },
};

export const useAuthStore = defineStore("auth", {
  state: () => defaultValue,

  getters: {
    isAuth: (state) => state.user.status,
    getCurrentTariff(): ITariff {
      return this.profile.tariff;
    },
    getCurrentTariffUpdated(): string {
      const updatedAt = this.profile.tariff.$updatedAt; // "2024-04-20T09:07:13.254+00:00"
      const date = new Date(updatedAt);
      const formattedDate = date.toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      return formattedDate; // "20.04.2024"
    },
    getCurrentTariffLevel(): number {
      return this.profile.tariff.tariff_level;
    },
    getUserKey(): string {
      return this.profile.key;
    },
    getKeyExpired(): number {
      return this.profile.key_days;
    },
    getRequestValue(): number {
      return this.profile.requests;
    },
    getRequestUsed(): number {
      return this.profile.used_requests;
    },
  },
  actions: {
    clear() {
      this.$patch(defaultValue);
    },
    set(input: IAuthStore) {
      this.$patch({ user: input });
    },
    async fetchProfile() {
      try {
        const response = await DB.listDocuments(DB_ID, COLLECTION_USERS, [
          Query.equal("userId", this.user.$id),
        ]);
        this.profile = response.documents[0]; // Обновляем массив планов данными из запроса
        console.log("response profile ", this.user.$id);
      } catch (error) {
        console.error(error); // Обрабатываем возможные ошибки
      }
    },
    async patchUserPlan(data: object) {
        try {
            const response = await DB.updateDocument(DB_ID, COLLECTION_USERS, this.profile.$id, data);
            this.fetchProfile()
            console.log("response updateDocument patchUserPlan", this.profile.$id);
          } catch (error) {
            console.error(error); // Обрабатываем возможные ошибки
          }
    },
    async patchUserRequestsValue(data: object) {
        try {
            const response = await DB.updateDocument(DB_ID, COLLECTION_USERS, this.profile.$id, data);
            this.fetchProfile()
            console.log("response updateDocument patchUserRequestsValue", this.profile.$id);
          } catch (error) {
            console.error(error); // Обрабатываем возможные ошибки
          }
    },
    async patchProfileData(data: object) {
        try {
            const response = await DB.updateDocument(DB_ID, COLLECTION_USERS, this.profile.$id, data);
            this.fetchProfile()
            console.log("response updateDocument patchUserProlongPlan", this.profile.$id);
          } catch (error) {
            console.error(error); // Обрабатываем возможные ошибки
          }
    }
  },
});

export const useIsLoadingStore = defineStore("isLoading", {
  state: () => ({
    isLoading: true,
  }),
  actions: {
    set(data: boolean) {
      this.$patch({ isLoading: data });
    },
  },
});
