import { defineStore } from "pinia";

import { DB } from "~/utils/appwrite";
import { DB_ID, COLLECTION_TARIFFS } from "~/app.constants";
// import { Plan } from '@/types/plan'

interface Plan {
  $id: string;
  name: string;
  desc: string;
  price: number;
  price_year: number;
  icon: string;
  tariff_level: number;
}

export const usePlansStore = defineStore("plans", {
  state: () => ({
    plans: [] as Plan[],
  }),
  actions: {
    async fetchPlans() {
      try {
        const response = await DB.listDocuments(DB_ID, COLLECTION_TARIFFS);
        this.plans = response.documents.map((doc: any) => ({
          $id: doc.$id,
          name: doc.name,
          desc: doc.desc,
          price: doc.price,
          price_year: doc.price_year,
          icon: doc.icon,
          tariff_level: doc.tariff_level,
        })); // Обновляем массив планов данными из запроса
      } catch (error) {
        console.error(error); // Обрабатываем возможные ошибки
      }
    },
    fetchPlansByLevel(currentLevel: number) {
      const filteredPlans = this.plans.filter(
        (plan) => plan.tariff_level > currentLevel
      );
     
      return filteredPlans;
    },
  },
  getters: {
    getPlans(): Plan[] {
      return this.plans;
    },
  },
});
