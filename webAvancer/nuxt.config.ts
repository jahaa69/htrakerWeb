// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NUXT_PUBLIC_SUPABASE_KEY
    }
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/test-utils'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  components: {
    dirs: [{ path: '~/components', pathPrefix: false }]
  },



  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})