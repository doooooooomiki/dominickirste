// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@nuxt/image'],
  devtools: { enabled: true },
  app: {
    head: {
      title: 'hi.',
      htmlAttrs: {
        lang: 'de',
      },
    },
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
})