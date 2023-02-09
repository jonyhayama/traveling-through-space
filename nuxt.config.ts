// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '@picocss/pico/css/pico.min.css'
  ],
  modules: [
    "@vueuse/nuxt"
  ],
  app: {
    head: {
      link: [{rel:'icon', type: 'image/png', href:"/favicon.png"}]
    }
  },
})
