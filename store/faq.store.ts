import { defineStore } from "pinia";

import { DB } from "@/utils/appwrite";
import { DB_ID, COLLECTION_FAQ_ID } from "@/app.constants";

interface Faq {
  $id: string;
  name: string;
  text: string;
}

export const useFaqStore = defineStore("faq", {
  state: () => ({
    all_faq: [] as Faq[],
  }),
  actions: {
    async fetchFaq() {
      try {
        const response = await DB.listDocuments(DB_ID, COLLECTION_FAQ_ID);
        this.all_faq = response.documents; // Обновляем массив планов данными из запроса

        // const response = await fetch("/data/faq.json");
        // const jsonData = await response.json();
        // this.all_faq = jsonData
      } catch (error) {
        console.error(error); // Обрабатываем возможные ошибки
      }
    },
  },
  getters: {
    getFaq(): Faq[] {
      return this.all_faq;
    },
  },
});
