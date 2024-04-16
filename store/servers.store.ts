import { defineStore } from "pinia";
import { reactive } from "vue";
import type {
  NameValuePair,
  Method,
  serverData,
  Params
} from "@/types/servers";

export const useServersStore = defineStore("servers", {
  state: () => ({
    data: reactive([] as serverData[]),
    loading: false,
    error: null as string | null,
    selectedServer: null as serverData | null, // Use serverData interface for selectedServer
    selectedParam: {
      main: null,
      additional: ''
    }
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
        this.selectDefaultMainParam('hoswbhistory.s2.marketsapi.ru')
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

    /** PARAMS */
    selectParamsByValue(paramsValue: string){
      const selected_main_param = this.selectedServer.params.main.find((el) => el.value === paramsValue)
      if (selected_main_param){
        this.selectedParam.main = selected_main_param
         } else {
          throw new Error("Param not found");
         }
    },
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
      return this.selectedServer ? this.selectedServer.params : []
    },
    getParamsMainData(): Params[] {
      return this.selectedServer ? this.selectedServer.params.main : []
    },
  }
});
