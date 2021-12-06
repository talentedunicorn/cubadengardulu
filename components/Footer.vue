<template>
  <footer>
    <section>
      <p>A collaboration by</p>
      <nav aria-label="Footer navigation">
        <a v-for="link in links" :key="link.sys.id" class="logo" :href="link.fields.url">
          <img :src="link.fields.logo.fields.file.url" :alt="link.fields.logo.fields.title">
        </a>
      </nav>
    </section>

    <small>Built by <a href="https://talentedunicorn.com">Talentedunicorn</a></small>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue'
import { Entry } from 'contentful'
import { getClient } from '../plugins/contentful'
export default Vue.extend({
  data(): { links: Entry<any>[] } {
    return {
      links: []
    }
  },
  async fetch() {
    this.links = (await getClient().getEntries({ content_type: 'footerLinks' })).items
  }
})
</script>

<style scoped>
footer {
  padding: 2rem 3rem 6rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 2rem;
  color: var(--gray);
}

h4 {
  font-weight: normal;
}

nav {
  display: flex;
  gap: 2rem;
  margin: 1rem 0;
}

.logo {
  flex: 0 8rem;
  filter: saturate(0%);
}

.logo:hover {
  filter: none;
  transform: translateY(-2px);
  transition: 0.3s;
}
</style>