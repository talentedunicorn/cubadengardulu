<template>
  <dl class="FAQs">
    <div
      v-for="(item, index) in faqs.items"
      :id="'#faq_' + index"
      :key="item.sys.id"
      :class="{ selected: selected === item.sys.id }"
      class="FAQ"
    >
      <dt
        v-scrollTo="'faq_' + index"
        class="FAQTitle"
        @click="selected = item.sys.id"
      >
        {{ item.fields.title }}
        <svg v-if="selected !== item.sys.id" viewBox="0 0 24 24">
          <use xlink:href="#arrow-down"></use>
        </svg>
      </dt>
      <dd v-show="selected === item.sys.id" class="FAQContent">
        <div>
          <RichTextRenderer :document="item.fields.answer" />
        </div>
        <figure v-if="item.fields.image" >
          <img :src="item.fields.image.fields.file.url" :alt="item.fields.image.fields.title" />
          <figcaption v-if="item.fields.image.fields.description">{{ item.fields.image.fields.description }}</figcaption>
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
    this.faqs = await getClient().getEntries({
      content_type: 'faq',
      order: 'sys.updatedAt',
    })
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
  border: 0.2em solid var(--blue-dark);
  border-radius: 0.3em;
  font-size: 1.2rem;
  background: var(--blue-dark);
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
    flex: 0 60% ;
  }
}

</style>
