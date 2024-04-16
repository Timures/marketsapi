import { defineStore } from "pinia";
import { reactive } from "vue";
import type {
  NameValuePair,
  Method,
  serverData,
  Params,MainParams,
  Lang,Response
} from "@/types/servers";

export const useServersStore = defineStore("servers", {
  state: () => ({
    data: reactive([] as serverData[]),
    loading: false,
    error: null as string | null,
    selectedServer: null as serverData | null, // Use serverData interface for selectedServer
    selectedMethod: null as Method | null,
    selectedParam: {
      main: null as MainParams | null,
      additional: ''
    },
    selectedLang: null as Lang | null,
    selectedResponse: null as Response | null
  }),
  actions: {
    async fetchServers() {
      try {
        this.loading = true;
        // Provide the correct relative URL to your JSON file
        const response = await fetch("/data/servers.json");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        this.data = jsonData;
        this.selectDefaultServer("wb");
        // this.selectDefaultMainParam('hoswbhistory.s2.marketsapi.ru')
        this.selectDefaultMethod(this.getMethods[0].type)
      } catch (error) {
        error || "Failed to fetch data";
      } finally {
        this.loading = false;
      }
    },
    // Action to select a server by its value
    selectServerByValue(serverValue: string) {
      const selected = this.data.find((server) => server.value === serverValue);
      if (selected) {
        this.selectedServer = selected;
      } else {
        throw new Error("Server not found");
      }
    },
    // Action to select a default server
    selectDefaultServer(serverValue: string) {
      // Assuming the default server value is 'defaultServerValue'
      this.selectServerByValue(serverValue);
    },
   
    /** METHODS */
    selectMethodsByType(methodType: string) {
      const selected_method = this.selectedServer?.methods.find((method) => method.type === methodType)
      if(selected_method){
        this.selectedMethod = selected_method
      } else {
        throw new Error("Method not found");
      }
    },
    selectDefaultMethod(methodType: string) {
      this.selectMethodsByType(methodType)
    },
    /** PARAMS */
    selectParamsByValue(paramsValue: string){
      if(this.selectedServer) {
        const selected_main_param = this.selectedServer.params.main.find((el) => el.value === paramsValue)
      if (selected_main_param){
        this.selectedParam.main = selected_main_param
         } else {
          throw new Error("Param not found");
         }
      }
    },
     /** RESPONSE */
    selectResponse(response: Response) {
      console.log('test select Resp', response);
      
      this.selectedResponse = response
    }
  },
  getters: {
    /** SERVERS */
    // Геттер для вывода только name из JSON
    getNameData(): NameValuePair[] {
      return this.data.map((item) => ({
        name: item.name,
        value: item.value,
      }));
    },
    // Getter to extract "name" and "value" from JSON
    getNameValueData(): NameValuePair | null {
      if (this.selectedServer) {
        return {
          name: this.selectedServer.name,
          value: this.selectedServer.value,
        };
      } else {
        return null;
      }
    },
    /** METHODS */
    // Getter to extract "methods" from JSON
    getMethods(): Method[] {
      return this.selectedServer ? this.selectedServer.methods : [];
    },
    /** PARAMS */
    getParamsData(): Params {
      if (this.selectedServer) {
        return this.selectedServer.params;
      } else {
        // Возвращаем пустой объект Params или генерируем ошибку, в зависимости от логики вашего приложения
        return { main: [], additional: { param: '' } }; // Пустой объект Params
      }
    },
    getParamsMainData(): MainParams[] {
      if (this.selectedServer && this.selectedServer.params) {
        return this.selectedServer.params.main
      } else {
        // Возвращаем пустой объект Params или генерируем ошибку, в зависимости от логики вашего приложения
        return  []; // Пустой объект Params
      }
    },
    /** Code Examples */
    getLangsData(): Lang[]{
      return this.selectedMethod ? this.selectedMethod.lang : []
    },
    getSelectedLang(): Lang | null {
      return this.selectedLang
    },
    /** Responses */
    getSelectedResponses(): Response[] {
      if (this.selectedServer && Array.isArray(this.selectedServer.response)) {
        return this.selectedServer.response;
      } else {
        return []; // Возвращаем пустой массив, если selectedServer или его response не определены или не являются массивом
      }    
    }
  }
});
