export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  app: {
    head: {
      titleTemplate: '%s | CRM System',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'My CRM System' },
      ],
    },
  },
  pinia: {
    storesDirs: ['./store/**']
  },
  shadcn: {
    prefix: 'Ui',
    componentDir: './components/ui'
  },
  modules: [
    '@nuxtjs/tailwindcss', '@nuxt/image', 'shadcn-nuxt',
    [
      '@nuxtjs/google-fonts', {
      families: {
        Lato: {
          wght: [300, 400, 700],
          ital: [300]
        },
      }
    }
    ],
    '@nuxt/icon',
    '@pinia/nuxt',
  ],
})
