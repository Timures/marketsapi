import { defineStore } from "pinia";

import { DB } from "~/utils/appwrite.ts";
import { DB_ID, COLLECTION_TARIFFS } from "~/app.constants";
// import { Plan } from '@/types/plan'

interface Plan {
  $id: string
  name: string
  desc: string
  price: number
  price_year: number
  icon: string
}

export const usePlansStore = defineStore("plans", {
  state: () => ({
    plans: [] as Plan[],
  }),
  actions: {
    async fetchPlans() {
      try {
        const response = await DB.listDocuments(DB_ID, COLLECTION_TARIFFS);
        this.plans = response.documents; // Обновляем массив планов данными из запроса
      } catch (error) {
        console.error(error); // Обрабатываем возможные ошибки
      }
    },
  },
  getters: {
    getPlans(): Plan[] {
      return this.plans;
    },
  },
});
