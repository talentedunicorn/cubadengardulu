<template>
  <nav class="social">
    <a
      v-for="(social, index) in socials"
      :key="index"
      :href="social.fields.url"
      :aria-label="social.fields.title"
    >
      <svg viewBox="0 0 24 25" aria-hidden="true">
        <use :xlink:href="social.fields.title | makeHash"></use>
      </svg>
    </a>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import { ContentfulClientApi, Entry } from 'contentful'
import { getClient } from '~/plugins/contentful'
export default Vue.extend({
  data(): { socials: Entry<unknown>[]} {
    return {
      socials: []
    }
  },
  async fetch() {
    const client: ContentfulClientApi = getClient()
    this.socials = (await client.getEntries({ content_type: 'socialLinks' })).items
  }
})
</script>

<style scoped>
.social,
.social a {
  display: inline-flex;
  align-items: center;
}

.social {
  gap: 2rem;
}

.social svg {
  inline-size: 1.5rem;
}
</style>