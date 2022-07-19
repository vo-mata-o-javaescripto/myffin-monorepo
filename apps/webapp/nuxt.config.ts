import { defineNuxtConfig } from 'nuxt';
import { quasar } from '@quasar/vite-plugin';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  css: [
    '~/assets/styles/quasar.sass',
    '@quasar/extras/roboto-font/roboto-font.css',
    '@quasar/extras/material-icons/material-icons.css'
  ],
  build: {
    transpile: ['quasar']
  },
  buildModules: ['@pinia/nuxt'],
  vite: {
    // define: {
    //  __QUASAR_SSR__: true,
    //  __QUASAR_SSR_SERVER__: true
    // },
    plugins: [
      // vue({
      // template: { transformAssetUrls },
      // }),
      quasar({
        sassVariables: 'assets/styles/quasar.variables.sass'
      })
    ]
  },
  typescript: {
    shim: false,
    strict: true
  }
});
