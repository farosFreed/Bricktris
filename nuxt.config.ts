export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      title: "Bricktris",
      charset: "utf-8",
    },
  },
  devtools: { enabled: true },
  modules: ["nuxt-icon", "@nuxtjs/apollo"],
  apollo: {
    clients: {
      default: {
        httpEndpoint: "https://spacex-production.up.railway.app/",
      },
    },
  },
  css: ["~/assets/styles/main.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/variables.scss";',
        },
      },
    },
  },
});
