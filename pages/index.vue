<template>
  <div class="Page">
    <nav>
      <div class="social">
        <a v-for="(social, index) in socialLinks" :key="index" :href="social.fields.url">
          <svg viewBox="0 0 24 25">
            <use :xlink:href="makeHash(social.fields.title)"></use>
          </svg>
        </a>
        <button class="button menu-toggle" @click="menuOpened = !menuOpened">
          <svg viewBox="0 0 24 24">
            <use v-if="menuOpened" xlink:href="#close"></use>
            <use v-else xlink:href="#menu"></use>
          </svg>
        </button>
      </div>


      <div :class="{ opened: menuOpened }" class="menu">
        <a href="#playlist">Playlist</a>
        <a href="#faqs">FAQs</a>
        <a href="#getInTouch">Get in touch</a>
        <button class="button">Pledge now</button>
      </div>
    </nav>

    <section class="Intro">
      <div class="container">
        <h1 class="heading">{{ intro.fields.title }}</h1>
        <RichTextRenderer :document="intro.fields.content" />
      </div>
    </section>

    <section class="Pledge">
      <div class="container">
        <h2 class="heading">{{ pledge.fields.title }}</h2>
        <figure>
          <img :src="pledge.fields.image.fields.file.url" :alt="pledge.fields.image.fields.description">
          <figcaption>{{ pledge.fields.image.fields.description }}</figcaption>
        </figure>
        <div class="content">
          <RichTextRenderer :document="pledge.fields.content" />
          <button class="button" disabled>Pledge now</button>
        </div>
      </div>
    </section>

    <section id="playlist" class="Playlists">
      <div class="container">
        <h2 class="heading">Playlist</h2>
        <Playlist v-for="playlist in playlists" :key="playlist.sys.id" :playlist="playlist">
          <RichTextRenderer :document="playlist.fields.content" />
        </Playlist>
      </div>
    </section>
    <section id="faqs">
      <div class="container">
        <h2 class="heading">FAQs</h2>
        <FAQs />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import RichTextRenderer from 'contentful-rich-text-vue-renderer'
import { getClient } from '~/plugins/contentful'

export default Vue.extend({
  components: {
    RichTextRenderer,
  },
  async asyncData() {
    const socialLinks = (await getClient().getEntries({ content_type: 'socialLinks' })).items
    const intro = await getClient().getEntry('2LeUyfp9edbEuOvBO1CCEQ')
    const pledge = await getClient().getEntry('1Br2SVPNM0uxZjnRa9SCl4')
    const playlists = (await getClient().getEntries({ content_type: 'playlist'})).items
    return { intro, pledge, socialLinks, playlists }
  },
  data() {
    return {
      menuOpened: false
    }
  },
  methods: {
   makeHash: (value: string) => `#${value.toLowerCase()}`,
  },
})
</script>

<style scoped>
.Page,
.container,
figure,
nav,
nav > div,
.social a {
  display: flex;
}

figure,
.container,
nav {
  flex-wrap: wrap;
  gap: 2rem;
}

nav {
  flex-wrap: wrap;
  justify-content: space-between;
  background: var(--white);
  position: sticky;
  top: 0;
  z-index: 3;
}

nav > div {
  gap: 1rem;
}

nav a {
  text-decoration: none;
  padding: 1rem;
}

.menu .button {
  margin: 1rem;
}

svg {
  inline-size: var(--icon-size, 1.7rem);
}

.Page,
figure {
  flex-flow: column;
}

.social {
  align-items: center;
}

.menu-toggle {
  --icon-size: 2rem;
  padding: 0;
  margin: 1rem;
  margin-left: auto;
}

.Page {
  min-height: 100vh;
  position: relative;
}

.Page::before {
  content: "";
  background: url(~/assets/images/cdd-poster.png) no-repeat center center/cover;
  height: 60vh;
}

.heading {
  flex: 100%;
}

nav,
.menu {
  flex-flow: column;
}

.Page > section,
.Intro .container {
  padding: 2rem 2rem 4rem;
}

.Intro {
  font-size: 1.2rem;
}

.Intro .heading {
  color: var(--pink);
}

.Intro .container {
  background: var(--white);
  border-radius: 2rem;
  gap: 2rem;
}

.Intro p:first-of-type {
  font-size: 1.7rem;
}

.Pledge {
  padding-top: 0;
}

.Pledge .content {
  padding: 2rem;
  background: var(--white);
  border-radius: 2rem;
  align-self: flex-start;
}

@media screen and (max-width: 60rem) {
  .menu:not(.opened) {
    display: none;
  }
}

@media screen and (min-width: 60rem) {
  .menu-toggle {
    display: none;
  }
  
  .Pledge figure,
  .Pledge .content,
  .Intro p:nth-of-type(-n+2) {
    flex: 0 calc(50% - 2rem);
  }

  nav,
  .menu {
    flex-flow: row;
    align-items: center;
  }
}
</style>
