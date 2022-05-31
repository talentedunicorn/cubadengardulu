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
      <nav v-if="totalPages > 1" class="pagination">
        <NuxtLink
          :to="currentPage > 2 ? '/blog?page=' + (currentPage - 1) : '/blog'"
        >
          <svg viewBox="0 0 24 24" aria-label="Previous page">
            <use xlink:href="#arrow-left"></use>
          </svg>
        </NuxtLink>
        <NuxtLink
          :to="
            currentPage < totalPages
              ? '/blog?page=' + (currentPage + 1)
              : '/blog?page=' + totalPages
          "
        >
          <svg viewBox="0 0 24 24" aria-label="Next page">
            <use xlink:href="#arrow-right"></use>
          </svg>
        </NuxtLink>
        <small>Page {{ currentPage }} of {{ totalPages }}</small>
      </nav>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { getClient } from '~/plugins/contentful'
const itemsPerPage: number = parseInt(process.env.POSTS_PER_PAGE || '10', 10)
export default Vue.extend({
  layout: 'blog',
  scrollToTop: true,
  data() {
    return {
      articles: [] as any,
      limit: itemsPerPage,
      skip: 0,
      total: 0,
    }
  },
  async fetch() {
    const page: number = parseInt(this.$route.query.page as string, 10) || 0
    const res = await getClient(
      this.$route.query.preview === 'true'
    ).getEntries({
      content_type: 'article',
      order: '-sys.updatedAt',
      limit: itemsPerPage,
      skip: page > 1 && page < this.total ? itemsPerPage * (page - 1) : 0,
    })
    const { items: articles, limit, skip, total } = res
    this.articles = articles
    this.limit = limit
    this.skip = skip
    this.total = total
  },
  head: {
    title: 'Stories',
  },
  computed: {
    currentPage(): number {
      return this.skip / this.limit + 1
    },
    totalPages(): number {
      return Math.ceil(this.total / this.limit)
    },
  },
  watch: {
    '$route.query': '$fetch',
  },
})
</script>

<style scoped>
.blog,
.article,
.pagination {
  display: flex;
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
  flex-flow: column;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  position: relative;
  transition: 0.3s ease-in;
}

.article::before {
  content: '';
  flex: 0 25rem;
  background: var(--bg, var(--gray-light)) no-repeat top center/cover;
  border-radius: inherit;
  transition: inherit;
}

.article:hover {
  background: var(--white);
}

.article:hover::before {
  transform: scale(0.9);
}

.article a {
  font-size: 1.4rem;
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

.pagination {
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 1rem;
  padding: 2rem;
}

.pagination svg {
  inline-size: 2.5rem;
  border: 0.2em solid currentColor;
  border-radius: 0.5em;
}

.pagination a {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.pagination small {
  flex: 100%;
  text-align: right;
  color: var(--gray);
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
