export default {
  target: 'static',
  pageTransition: 'slide-down',
  head: {
    title: '',
    titleTemplate: (t) => t ?  `${t} — Cuba Dengar Dulu` : `Cuba Dengar Dulu`,
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
    '@nuxt/image',
    '@nuxtjs/google-analytics'
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],
  axios: {
    baseURL: process.env.BASE_URL
  },
  image: {
    provider: 'contentful',
    contentful: {
      baseURL: 'https://images.ctfassets.net'
    }
  },
  googleAnalytics: {
    id: process.env.GA_ID
  },
  auth: {
    redirect: {
      callback: '/callback',
      home: '/admin'
    },
    strategies: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        scope: ['email', 'profile'],
        codeChallengeMethod: '',
        responseType: 'token id_token',
      }
    }
  },
  env: {
    BASE_URL: process.env.BASE_URL || process.env.NUXT_ENV_VERCEL_URL,
    NUXT_ENV_VERCEL_URL: process.env.NUXT_ENV_VERCEL_URL,
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_ACCESS_TOKEN: process.env.CTF_ACCESS_TOKEN,
    CTF_PREVIEW_TOKEN: process.env.CTF_PREVIEW_TOKEN,
    FORMSPREE_ENDPOINT: process.env.FORMSPREE_ENDPOINT,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    PLEDGE_LIMIT: process.env.PLEDGE_LIMIT,
    POSTS_PER_PAGE: process.env.POSTS_PER_PAGE,
    GA_ID: process.env.GA_ID,
    PLEDGE: process.env.PLEDGE,
    INTRO_CONTENT: process.env.INTRO_CONTENT,
    PLEDGE_CONTENT: process.env.PLEDGE_CONTENT,
    CONTACT_CONTENT: process.env.CONTACT_CONTENT,
    PLAYLIST_CONTENT: process.env.PLAYLIST_CONTENT,
    LATEST_POST_COUNT: process.env.LATEST_POST_COUNT,
  }
}
