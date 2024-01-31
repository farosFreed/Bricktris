// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    strict: true,
  },
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
