import { defineStore } from 'pinia';

export const useScrollStore = defineStore('scrollStore', {
  state: () => ({
    elementToScroll: null as HTMLElement | null,
  }),
  actions: {
    setElementToScroll(element: HTMLElement | null) {
      this.elementToScroll = element;
    },
  },
});