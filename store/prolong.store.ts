import { defineStore } from "pinia";

import { DB } from "@/utils/appwrite";
import { DB_ID, COLLECTION_PROLONG_ID } from "@/app.constants";

interface IProlongPrice {
  month: number;
  price: number;
  profit: number
}

export const useProlongStore = defineStore("prolong", {
  state: () => ({
    prolong_prices: [] as IProlongPrice[],
  }),
  actions: {
    async fetchProlongPrices() {
      try {
        const response = await DB.listDocuments(DB_ID, COLLECTION_PROLONG_ID);
        this.prolong_prices = response.documents.map((doc: any) => ({
            month: doc.month,
            price: doc.price,
            profit: doc.profit
        })); // Обновляем массив цен на продление данными из запроса
      } catch (error) {
        console.error(error); // Обрабатываем возможные ошибки
      }
    },
  },
  getters: {
    getProlongPrice(): IProlongPrice[] {
      return this.prolong_prices;
    },
  },
});
