<template>
  <article class="article">
    <header class="article_header">
      <h2 class="article_title">{{ article.fields.title }}</h2>
      <p>Published on <time :datetime="article.sys.updatedAt">{{ article.sys.updatedAt | formatDate }}</time></p>
    </header>
    <figure v-if="article.fields.cover" class="article_cover">
      <img :src="article.fields.cover.fields.file.url" :alt="article.fields.cover.fields.title">
      <figcaption>{{ article.fields.cover.fields.title }}</figcaption>
    </figure>
    <main class="article_content container">
      <RichTextRenderer :document="article.fields.content" :node-renderers="renderNodes()" />
    </main>
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
import RichTextRenderer from 'contentful-rich-text-vue-renderer'
import { Entry } from 'contentful'
import { BLOCKS } from '@contentful/rich-text-types'
import { getClient } from '~/plugins/contentful'
export default Vue.extend({
  components: {
    RichTextRenderer,
  },
  layout: 'blog',
  async asyncData({ query, params }) {
    const article = await getClient(query.preview === 'true').getEntry(params.id)
    return { article }
  },
  data(): { article: Entry<any> } {
    return {
      article: {} as Entry<any>
    }
  },
  head(): { title: string } {
    return {
      title: this.article.fields.title
    }
  },
  methods: {
    renderNodes() {
      return {
        [BLOCKS.EMBEDDED_ASSET]: (node: any, key: any, h: any, next: any) => {
          return h('figure', { key },
          [
            h('img', { 
              key,
              attrs: {
                  src: node.data.target.fields.file.url,
                  alt: node.data.target.fields.title
              }, 
            }, next(node.content, key, h, next)),
            h('figcaption', { 
              key,
            }, node.data.target.fields.title)
          ])
        }
      }
    }
  }
})
</script>
<style scoped>
.article,
.article_cover,
.article_header {
  display: flex;
  flex-flow: column;
}

.article_title {
  font-size: 5vmax;
  line-height: 1.4;
}

.article_header,
.article_content {
  padding: 2rem;
}

.article_content a {
  word-wrap: break-word;
}

.article_content p {
  margin-bottom: 1.5rem;
  font-size: 1.3  rem;
  line-height: 1.6;
}

.article_content h3 {
  margin: 3rem 0 0.75rem;
}

.article_content figure {
  margin: 3rem 0; 
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 1rem;
}

.article_content figcaption {
  padding: 1rem;
  color: var(--gray);
  font-size: 1rem;
}

.article_cover {
  order: -1;
}

.article_cover figcaption {
  padding: 1rem 2rem;
  color: var(--gray);
  align-self: flex-end;
}

@media screen and (min-width: 60rem) {
  .article_cover {
    max-width: 50rem;
    margin: 2rem;
    align-self: flex-end;
  }

  .article_cover img {
    border-radius: 1rem;
  }
}
</style>