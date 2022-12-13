<template>
  <article class="article" :style="{ '--bg': `url(${background})` }">
    <NuxtLink :to="link">{{title}}
    </NuxtLink>
      <span
        >Published on
        <time :datetime="published">{{
          published | formatDate
        }}</time>
      </span
      >
  </article>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'Preview',
  props: {
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    published: {
      type: String,
      required: true
    },
    background: {
      type: String,
      required: true
    }
  }
})
</script>

<style scoped>
.article {
  display: flex;
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
  margin-bottom: auto;
}

.article a::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>