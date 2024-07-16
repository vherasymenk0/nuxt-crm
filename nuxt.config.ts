export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', 'shadcn-nuxt'],
  shadcn: {
    prefix: 'Ui',
    componentDir: './components/ui'
  }
})
