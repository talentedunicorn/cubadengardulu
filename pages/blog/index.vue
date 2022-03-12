<template>
  <section class="blog">
    <div class="container">
      <ol class="article_list">
        <li
          v-for="article in articles"
          :key="article.sys.id"
          class="article"
          :style="{ '--bg': `url(${article.fields.cover.fields.file.url})` }"
        >
          <NuxtLink :to="'/blog/' + article.sys.id">{{
            article.fields.title
          }}</NuxtLink>
          <span
            >Published on
            <time :datetime="article.sys.updatedAt">{{
              article.sys.updatedAt | formatDate
            }}</time></span
          >
        </li>
      </ol>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { getClient } from '~/plugins/contentful'
export default Vue.extend({
  layout: 'blog',
  scrollToTop: true,
  async asyncData({ query }) {
    const articles = (
      await getClient(query.preview === 'true').getEntries({
        content_type: 'article',
        order: '-sys.updatedAt',
      })
    ).items
    return { articles }
  },
  head: {
    title: 'Stories',
  },
})
</script>

<style scoped>
.blog {
  display: flex;
  min-height: 100%;
}

.blog_title {
  font-size: 1rem;
  text-transform: uppercase;
}

.article_list {
  display: grid;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 4rem 2rem;
}

.article {
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  position: relative;
}

.article::before {
  content: '';
  flex: 10rem;
  background: var(--bg, var(--gray-light)) no-repeat top center/cover;
  border-radius: inherit;
}

.article:hover {
  background: var(--white);
}

.article a {
  font-size: 1.5rem;
  text-decoration: none;
}

.article a::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

@media screen and (min-width: 40rem) {
  .article_list {
    grid-template-columns: repeat(
      auto-fill,
      minmax(var(--card-size, 15rem), 1fr)
    );
  }
}

@media screen and (min-width: 60rem) {
  .article_list {
    --card-size: 25rem;
  }
}
</style>
