import { defineNuxtConfig } from "@nuxt/bridge"
import { createRouter } from "./router"

export default defineNuxtConfig({
  bridge: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-pinia-example',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/pinia.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@pinia/nuxt'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@pinia/nuxt'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config) {
      config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto'
      })
    }
  },
  axios: {
    baseURL: 'https://jsonplaceholder.typicode.com/',
    browserBaseURL: 'https://jsonplaceholder.typicode.com/'
  },
  router: {
    mode: 'history',
  }

})

