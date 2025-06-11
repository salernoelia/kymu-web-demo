// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
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

  fonts: {
    families: [
      {
        name: "Poppins",
        provider: "google",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      },
    ],
  },

  shadcn: {
    componentDir: "./components/ui",
    prefix: "ui",
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
