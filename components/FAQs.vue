<template>
  <dl class="FAQs">
    <div
      v-for="item in faqs.items"
      :key="item.sys.id"
      :class="{ selected: selected === item.sys.id }"
      class="FAQ"
    >
      <dt class="FAQTitle" @click="selected = item.sys.id">
        {{ item.fields.title }}
        <svg v-if="selected !== item.sys.id" viewBox="0 0 24 24">
          <use xlink:href="#arrow-down"></use>
        </svg>
      </dt>
      <dd v-show="selected === item.sys.id" class="FAQContent">
        <div>
          <RichTextRenderer :document="item.fields.answer" />
        </div>
        <figure v-if="item.fields.image">
          <nuxt-img
            :src="item.fields.image.fields.file.url"
            :alt="item.fields.image.fields.title"
            width="600"
            loading="lazy"
            format="webp"
          />
          <figcaption v-if="item.fields.image.fields.description">
            {{ item.fields.image.fields.description }}
          </figcaption>
        </figure>
      </dd>
    </div>
  </dl>
</template>

<script lang="ts">
// eslint-disable-next-line import/named
import Vue from 'vue'
import { RichTextContent, ContentfulCollection, Entry } from 'contentful'
import RichTextRenderer from 'contentful-rich-text-vue-renderer'
import { getClient } from '~/plugins/contentful'

interface FAQ {
  fields: {
    title: string
    answer: RichTextContent
  }
}
export default Vue.extend({
  components: {
    RichTextRenderer,
  },
  data(): { faqs: ContentfulCollection<Entry<FAQ>>; selected: string } {
    return {
      faqs: {} as ContentfulCollection<Entry<FAQ>>,
      selected: '',
    }
  },
  async fetch() {
    this.faqs = (
      (await getClient().getEntry('2boIQq9r3ln0iLGjquWg0D')) as Entry<any>
    ).fields
    this.selected = this.faqs.items[0].sys.id
  },
})
</script>
<style scoped>
.FAQs,
.FAQ,
.FAQTitle {
  display: flex;
  gap: 1rem;
}

.FAQs {
  min-height: 70vh;
  flex: 100%;
}

.FAQs,
.FAQ {
  flex-flow: column;
}

.FAQTitle {
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1.3rem;
  padding: 0.5rem 1rem;
}

.FAQ:not(.selected) .FAQTitle {
  cursor: pointer;
  border: 0.2em solid var(--black);
  border-radius: 0.3em;
  font-size: 1.2rem;
  background: var(--black);
  color: var(--white);
}

.FAQ:not(.selected) .FAQTitle:hover {
  background: var(--white);
  color: var(--black);
  border-color: var(--black);
}

.FAQTitle svg {
  inline-size: 2rem;
}

.FAQContent {
  padding: 0 1rem;
  display: flex;
  flex-wrap: wrap-reverse;
  gap: 2rem;
}

.FAQContent figure {
  flex: 1;
}

.FAQContent img {
  border-radius: 0.5rem;
}

@media screen and (min-width: 60rem) {
  .FAQContent > div {
    flex: 0 60%;
  }
}
</style>
