import { defineStore } from "pinia";

import { DB } from "@/utils/appwrite.ts";
import { DB_ID, COLLECTION_API_ID } from "@/app.constants";


interface IApi {
    $id: string
    name: string
    status: string
    value: string
  }

  export const useMainApiStore = defineStore("api", {
    state: () => ({
      main_api: [] as IApi[],
    }),
    actions: {
      async fetchMainApi() {
        try {
          const response = await DB.listDocuments(DB_ID, COLLECTION_API_ID);
          this.main_api = response.documents; // Обновляем массив планов данными из запроса
        } catch (error) {
          console.error(error); // Обрабатываем возможные ошибки
        }
      },
    },
    getters: {
      getMainApi(): IApi[] {
        return this.main_api;
      },
    },
  });