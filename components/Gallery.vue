<template>
  <pre v-if="$fetchState.pending">Loading gallery...</pre>
  <ol v-else class="gallery">
    <li v-for="item in gallery" :key="item.sys.id" class="gallery_item">
      <a :href="item.fields['link']">
        <nuxt-img
          :src="item.fields['image'].fields.file.url"
          :alt="item.fields['image'].fields.title"
          width="500"
          loading="lazy"
          format="webp"
        />
      </a>
    </li>
  </ol>
</template>

<script lang="ts">
import { ContentTypeCollection, Entry } from 'contentful'
import Vue from 'vue'
import { getClient } from '../plugins/contentful'
export default Vue.extend({
  data: () => {
    return {
      gallery: [] as ContentTypeCollection['items'],
    }
  },
  async fetch() {
    this.gallery = (
      (await getClient().getEntry('jsHkX7w53QgH0oWk0I4Xo')) as Entry<any>
    ).fields.items.slice(0, 12) // Get 12 items
  },
})
</script>

<style scoped>
.gallery {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 2rem;
}

.gallery_item a {
  height: 100%;
  display: flex;
  justify-content: center;
}

.gallery_item img {
  border-radius: 1rem;
  object-fit: cover;
  height: inherit;
}

@media screen and (min-width: 30rem) {
  .gallery {
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
  }
}
</style>
