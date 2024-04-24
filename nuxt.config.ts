// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  imports: {
    autoImport: true,
  },
  // devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
    }
  },
  css: ['~/assets/css/main.css'],
  modules: [
    'vue-yandex-maps/nuxt',

  ],
  yandexMaps: {
    apikey: 'ea07219b-2b86-411a-849e-61890a66ead6',
  },
  plugins: [
    '~/plugins/vue-tailwind-datepicker.js',
    '~/plugins/maska.ts',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  
  
})
