<template>
  <pre v-if="$fetchState.pending">Loading gallery...</pre>
  <ol v-else class="gallery">
    <li v-for="item in gallery" :key="item.sys.id" class="gallery_item">
      <a :href="item.fields.link">
        <img :src="item.fields.image.fields.file.url" :alt="item.fields.image.fields.title">
      </a>
    </li>
  </ol>
</template>

<script lang="ts">
import Vue from 'vue'
import { ContentfulCollection, Entry } from 'contentful'
import { getClient } from '../plugins/contentful'
export default Vue.extend({
  data() {
    return {
      gallery: {} as ContentfulCollection<Entry<any>>
    }
  },
  async fetch() {
    this.gallery = (await getClient().getEntry('jsHkX7w53QgH0oWk0I4Xo') as Entry<any>).fields.items
  }
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
  display: block;
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
