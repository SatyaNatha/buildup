// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    '/': { prerender: true },
    '/workout': { middleware: 'auth' }
  },
  plugins: [
    '~/plugins/firebase.js'
  ],
  build: {
    transpile: ['firebase']
  }
});
