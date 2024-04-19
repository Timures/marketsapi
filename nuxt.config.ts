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
  // app: {
  //   head: {
  //     link: [
  //       { rel: "stylesheet", href: "/css/jquery-ui.min.css" },
  //       { rel: "stylesheet", href: "/css/swiper-bundle.min.css" },
  //     ],
  //     script: [
  //       { src: '/js/jquery-3.7.1.min.js' },
  //       { src: '/js/jquery-ui.min.js' },
  //       { src: '/js/popper.min.js' },
  //       { src: '/js/swiper-bundle.min.js' },
  //       { src: '/js/tippy-bundle.umd.js' },
  //       { src: '/js/jcf.js' },
  //       { src: '/js/jcf.select.js' },
  //       { src: '/js/modal.js' },
  //       { src: '/js/copy.js' },
  //       { src: '/js/base.js' },
  //       { src: '/js/faq.js' },
  //       { src: '/js/hero.js' },
  //       { src: '/js/help.js' },
  //       { src: '/js/select.js' },
  //       { src: '/js/table.js' },
  //       { src: '/js/plans.js' },
  //       { src: '/js/personal.js' }
  //   ],
  //   },
  // },
  devtools: { enabled: false },
});
