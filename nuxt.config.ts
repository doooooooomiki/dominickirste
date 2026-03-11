// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/image', '@nuxt/fonts', '@vueuse/nuxt'],
  devtools: { enabled: true },
  app: {
    head: {
      title: 'hi.',
      htmlAttrs: {
        lang: 'de',
      },
    },
  },
  css: ['~/assets/css/main.css'],
  features: {
    inlineStyles: false,
  },
  compatibilityDate: '2025-07-15',
  eslint: {
    config: {
      stylistic: {
        semi: false,
        quotes: 'single',
        commaDangle: 'always-multiline',
        indent: 2,
        arrowParens: true,
        braceStyle: '1tbs',
      },
    },
  },
  fonts: {
    families: [
      { name: 'Rubik Mono One', provider: 'google', weight: '900' },
      { name: 'Geist', provider: 'google', weight: '400' },
    ],
  },
})
