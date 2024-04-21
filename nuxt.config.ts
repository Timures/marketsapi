// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  pages: true,
  modules: ['@pinia/nuxt', 'nuxt-swiper'],
  pinia: {
    storesDirs: ["./store/**"],
  },
  swiper: {
    // Swiper options
    //----------------------
    prefix: 'Swiper',
    styleLang: 'css',
    // modules: ['autoplay','navigation', 'pagination'], // all modules are imported by default
  },
  plugins: [
    '~/plugins/vue-tippy.ts',
  ],
  devtools: { enabled: false },
});
