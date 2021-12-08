export default {
  target: 'static',
  pageTransition: 'slide-down',
  head: {
    title: 'Pledge now',
    titleTemplate: '%s — Cuba Dengar Dulu',
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
  css: [
    "~/assets/styles/reset.css",
    "~/assets/styles/fonts.css",
    "~/assets/styles/global.css",
    "~/assets/styles/form.css",
    "~/assets/styles/button.css",
    "~/assets/styles/transitions.css",
  ],
  plugins: [
    { src: "~/plugins/contentful.ts" },
    { src: "~/plugins/filters.ts" },
    { src: "~/plugins/scroll-to.ts", mode: "client" },
    { src: "~/plugins/preview.ts", mode: "client" },
  ],
  components: true,
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxt/image'
  ],
  modules: [
    '@nuxtjs/axios'
  ],
  axios: {
    baseURL: process.env.BASE_URL,
  },
  image: {
    contentful: {
      baseURL: 'https://images.ctfassets.net'
    }
  },
  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_ACCESS_TOKEN: process.env.CTF_ACCESS_TOKEN,
    CTF_PREVIEW_TOKEN: process.env.CTF_PREVIEW_TOKEN,
    FORMSPREE_ENDPOINT: process.env.FORMSPREE_ENDPOINT,
    PLEDGE_LIMIT: process.env.PLEDGE_LIMIT,
  }
}
