export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
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
  ],
})
