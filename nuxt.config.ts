// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  css: ["~/assets/css/reset.css", "~/assets/css/tailwind.css"],
  modules: [
    "@nuxt/fonts",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "@nuxt/icon",
    "nuxt-mcp",
    "shadcn-nuxt",
  ],

  shadcn: {
    componentDir: "./components/ui",
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
