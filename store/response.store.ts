import { defineStore } from "pinia";

import { DB } from "@/utils/appwrite.ts";
import { DB_ID, COLLECTION_RESPONSE_ID } from "@/app.constants";


interface IResponse {
    $id: string
    name: string
    code: string
  }
  
  export const useResponseStore = defineStore("response", {
    state: () => ({
      all_responses: [] as IResponse[],
    }),
    actions: {
      async fetchResponses() {
        try {
          const response = await DB.listDocuments(DB_ID, COLLECTION_RESPONSE_ID);
          this.all_responses = response.documents; // Обновляем массив планов данными из запроса
        } catch (error) {
          console.error(error); // Обрабатываем возможные ошибки
        }
      },
    },
    getters: {
      getResponses(): IResponse[] {
        return this.all_responses;
      },
    },
  });