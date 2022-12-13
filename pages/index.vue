<template>
  <div
    class="Page"
    :style="{ '--cover': `url(${intro.fields.image.fields.file.url})` }"
  >
    <aside class="Nav">
      <Social />
      <button
        class="button menu-toggle"
        aria-label="Toggle menu"
        @click="menuOpened = !menuOpened"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <use v-if="menuOpened" xlink:href="#close"></use>
          <use v-else xlink:href="#menu"></use>
        </svg>
      </button>
      <div :class="{ opened: menuOpened }" class="menu">
        <NuxtLink to="/blog" class="button"> Read stories </NuxtLink>
        <a v-scrollTo="'playlist'" href="#playlist" @click="closeMenu"
          >Listen</a
        >
        <a v-scrollTo="'faqs'" href="#faqs" @click="closeMenu">FAQs</a>
        <a v-scrollTo="'getInTouch'" href="#getInTouch" @click="closeMenu"
          >Get in touch</a
        >
        <!-- <button class="button" @click="openPledge">Pledge now</button>  -->
      </div>
    </aside>

    <section class="Intro">
      <div class="container">
        <h1 class="heading">{{ intro.fields.title }}</h1>
        <RichTextRenderer :key="intro.sys.id" :document="intro.fields.content" />
      </div>
    </section>

    <!-- <section class="Pledge">
      <div class="container">
        <h2 class="heading">{{ pledgeContent.fields.title }}</h2>
        <figure>
          <nuxt-img
            width="600"
            :src="pledgeContent.fields.image.fields.file.url"
            :alt="pledgeContent.fields.image.fields.description"
            loading="lazy"
            format="webp"
          />
          <figcaption>
            {{ pledgeContent.fields.image.fields.description }}
          </figcaption>
        </figure>
        <div class="content">
          <RichTextRenderer :key="pledgeContent.sys.id" :document="pledgeContent.fields.content" />
          <RichTextRenderer :key="pledge.sys.id" :document="pledge.fields.content" />
          <client-only>
            <Pledge ref="pledge" :pledge-count="pledgeCount" :max-pledges="maxPledges" :recount="$fetch">
              <RichTextRenderer :key="pledge.sys.id + '_form'" :document="pledge.fields.content" />
            </Pledge>
          </client-only>
        </div>
      </div>
    </section> -->

    <section id="stories" class="Stories">
      <div class="container">
        <h2 class="heading">Latest stories</h2>
        <div class="latest-posts">
          <Preview
            v-for="article in latestPosts"
            :key="article.sys.id"
            :background="article.fields.cover.fields.file.url"
            :link="('/blog/' + article.sys.id)"
            :title="article.fields.title"
            :published="article.sys.updatedAt"
          />
        </div>
        <NuxtLink to="/blog" class="button"> Read more </NuxtLink>
      </div>
    </section>

    <section id="playlist" class="Playlists">
      <div class="container">
        <h2 class="heading">Listen</h2>
        <Carousel :items="playlists">
          <template #default="{ data }">
            <Playlist :playlist="data">
              <RichTextRenderer :key="data.sys.id" :document="data.fields.content" />
            </Playlist>
          </template>
        </Carousel>
      </div>
    </section>
    <section id="faqs">
      <div class="container">
        <h2 class="heading">FAQs</h2>
        <FAQs />
      </div>
    </section>
    <section id="getInTouch" class="Contact">
      <div class="container">
        <h2 class="heading">{{ contact.fields.title }}</h2>
        <figure>
          <nuxt-img
            :src="contact.fields.image.fields.file.url"
            :alt="contact.fields.image.fields.title"
            width="500"
            loading="lazy"
            format="webp"
          />
        </figure>
        <ContactForm class="ContactForm" />
      </div>
    </section>
    <section class="Gallery">
      <div class="container">
        <h2 class="heading">Gallery</h2>
        <Gallery class="GalleryContent" />
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import RichTextRenderer from 'contentful-rich-text-vue-renderer'
import { ContentfulClientApi, Entry } from 'contentful'
import { getClient } from '~/plugins/contentful'

export default Vue.extend({
  components: {
    RichTextRenderer,
  },
  async asyncData({ query }) {
    const {
      INTRO_CONTENT,
      PLEDGE,
      PLEDGE_CONTENT,
      CONTACT_CONTENT,
      PLAYLIST_CONTENT,
      LATEST_POST_COUNT
    } = process.env
    const client: ContentfulClientApi = getClient(query.preview === 'true')
    const intro = await client.getEntry(INTRO_CONTENT!)
    const pledge = await client.getEntry(PLEDGE!) as Entry<any>;
    const contact = await client.getEntry(CONTACT_CONTENT!);
    const pledgeContent = await client.getEntry(PLEDGE_CONTENT!)
    const playlists = (
      (await client.getEntry(PLAYLIST_CONTENT!)) as Entry<any>
    ).fields.items
    const latestPosts = (await client.getEntries({
      content_type: 'article',
      order: '-sys.updatedAt',
      limit: LATEST_POST_COUNT,
    })).items;
    return { intro, pledge, pledgeContent, playlists, contact, latestPosts }
  },
  data: () => {
    const { PLEDGE_LIMIT } = process.env
    return {
      intro: {} as Entry<any>,
      contact: {} as Entry<any>,
      pledge: {} as Entry<any>,
      pledgeContent: {} as Entry<any>,
      latestPosts: [] as Entry<any>[],
      maxPledges: parseInt(PLEDGE_LIMIT || '0', 10),
      pledgeCount: 0,
      menuOpened: false,
      currentPlaylist: {} as Entry<any>,
      playlists: []
    }
  },
  // async fetch() {
  //   this.pledgeCount = (await this.$axios.get(`/api/pledges`)).data.total
  // },
  methods: {
    closeMenu() {
      if (this.menuOpened) this.menuOpened = false
    },
    openPledge() {
      ;(this.$refs.pledge! as any).openForm()
    },
  },
})
</script>

<style scoped>
.Page,
.container,
.Nav,
.menu,
.social a {
  display: flex;
}

.container,
.Nav {
  flex-wrap: wrap;
  gap: 2rem;
}

.Nav {
  flex-wrap: wrap;
  justify-content: space-between;
  background: var(--white);
  padding: 0 1rem;
}

.Nav a {
  text-decoration: none;
  padding: 1rem;
}

.Page,
.menu,
.Playlists .container {
  flex-flow: column;
}

.menu {
  flex: 100%;
  gap: 1rem;
}

.menu .button {
  padding: 0.5rem;
}

svg {
  inline-size: 1.7rem;
}

.social {
  align-items: center;
  margin-left: 1rem;
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
  content: '';
  background: var(--cover) no-repeat center center/cover;
  height: 60vh;
}

.heading {
  flex: 100%;
}

.Intro .container {
  padding: 2rem;
}

.Page > section {
  padding: 4rem 2rem;
}

.Intro {
  font-size: 1.2rem;
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

.Stories .button {
  margin-left: auto;
}

.latest-posts {
  background: var(--gray-light);
  display: grid;
  grid-auto-columns: minmax(var(--post-width, 20rem), 1fr);
  gap: 2rem;
  padding: 2rem;
  overflow-x: auto;
  width: 100%;
  scroll-snap-type: x mandatory;
  scroll-padding: 2rem;
}

.latest-posts > * {
  scroll-snap-align: center;
  grid-row: 1;
}

.Playlists,
.Gallery {
  background: var(--yellow);
}

.Contact {
  background: var(--gray-light);
}

.Contact .container {
  gap: 3rem;
}

.GalleryContent,
.ContactForm {
  flex: 100%;
}

.ContactForm {
  margin: 0 auto;
}

.Contact figure {
  flex: auto;
}

.Contact img {
  border-radius: 0.5rem;
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
  .Intro p:nth-of-type(-n + 2) {
    flex: 0 calc(50% - 1rem);
  }

  .menu {
    flex-flow: row;
    align-items: center;
    flex: 0 auto;
  }

  .Nav {
    position: sticky;
    top: 0;
    z-index: 3;
  }

  .Page > section {
    padding-top: 6rem;
  }

  .ContactForm {
    flex: 0 50rem;
    align-self: flex-start;
  }
  .latest-posts {
    --post-width: 30rem;
  }
}
</style>
