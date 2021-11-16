export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Cuba Dengar Dulu',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'an initiative by youths, for youths to promote an empathetic approach to the freedoms of religion or belief and expression' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/styles/reset.css",
    "~/assets/styles/fonts.css",
    "~/assets/styles/global.css",
    "~/assets/styles/form.css",
    "~/assets/styles/button.css",
    "~/assets/styles/transitions.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/contentful.ts" },
    { src: "~/plugins/scroll-to.ts", mode: "client" },
    { src: "~/plugins/preview.ts", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],

  // Environment variables
  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_ACCESS_TOKEN: process.env.CTF_ACCESS_TOKEN,
    CTF_PREVIEW_TOKEN: process.env.CTF_PREVIEW_TOKEN,
    FORMSPREE_ENDPOINT: process.env.FORMSPREE_ENDPOINT,
  }
}
