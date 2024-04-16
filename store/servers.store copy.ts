import { defineStore } from "pinia";
import { reactive } from "vue";
import type {
  Method,
  NameValuePair,
  Params,
  serverData,
} from "@/types/servers";

export const useServersStore = defineStore("servers", {
  state: () => ({
    data: reactive([] as serverData[]),
    loading: false,
    error: null as string | null,
    selectedServer: null as serverData | null, // Use serverData interface for selectedServer
  }),
  getters: {
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
    // Getter to extract "methods" from JSON
    getMethods(): Method[] {
      return this.selectedServer ? this.selectedServer.methods : [];
    },
    // Геттер для получения метода по его типу
    getMethodByType(): (methodType: string) => Method | null {
      return (methodType: string) => {
        if (this.selectedServer) {
          return (
            this.selectedServer.methods.find(
              (item) => item.type === methodType
            ) || null
          );
        }
        return null;
      };
    },
    // Геттер для вывода params из JSON
    getParamsData(): Params | null {
      return this.selectedServer ? this.selectedServer.params : null;
    },
    // Геттер для вывода параметров main в формате { name: string, value: string }[]
    getParamsMainData(): { name: string; value: string }[] | null {
      return this.selectedServer
        ? this.selectedServer.params.main.map((item) => ({
            name: item.name,
            value: item.value,
          }))
        : null;
    },
    getServers(): serverData[] {
      return this.data;
    },
    getSelectedServer(): serverData | null {
      return this.selectedServer;
    },
  },
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
    selectParamsMainByValue(paramsMainValue: string) {
      if (this.selectedServer) {
        const selected = this.selectedServer.params.main.find(
          (params) => params.value === paramsMainValue
        );
        if (selected) {
          this.selectedParams = selected;
        } else {
          throw new Error("Server not found");
        }
      }
    },
    // Action to select a default server
    selectDefaultServer(serverValue: string) {
      // Assuming the default server value is 'defaultServerValue'
      this.selectServerByValue(serverValue);
    },
  },
});
