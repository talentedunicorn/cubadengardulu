<template>
  <p v-if="$fetchState.pending">Loading FAQs...</p>
  <dl v-else class="FAQs">
    <section class="FAQWrapper">
      <div v-for="item in faqs" :key="item.sys.id" :class="{ selected: selected === item.sys.id }" class="FAQ">
        <dt class="FAQTitle" @click="selected = item.sys.id">
          {{ item.fields.title }}
          <svg v-if="selected !== item.sys.id" viewBox="0 0 24 24">
            <use xlink:href="#arrow-down"></use>
          </svg>
        </dt>
          <dd v-if="selected === item.sys.id" class="FAQContent">
            <RichTextRenderer :document="item.fields.answer" />
          </dd>
      </div>
    </section>
  </dl>
</template>

<script lang="ts">
// eslint-disable-next-line import/named
import Vue, { PropType } from 'vue'
import { RichTextContent } from 'contentful'
import RichTextRenderer from 'contentful-rich-text-vue-renderer'
import { getClient } from '~/plugins/contentful'

type FAQ = {
  fields: {
    title: string
    answer: RichTextContent
  }
}
export default Vue.extend({
  components: {
    RichTextRenderer
  },
  data(): { faqs: PropType<FAQ[]>, selected: string } {
    return {
      faqs: Array as PropType<FAQ[]>,
      selected: "",
    }
  },
  async fetch() {
    this.faqs = (await getClient().getEntries({ content_type: 'faq', order: 'sys.updatedAt' })).items as unknown as PropType<FAQ[]>
  }
})
</script>
<style scoped>
.FAQs,
.FAQ,
.FAQTitle,
.FAQWrapper {
  display: flex;
  gap: 1rem;
}

.FAQs {
  min-height: 30rem;
  flex: 100%;
}

.FAQWrapper,
.FAQ {
  flex-flow: column;
}

.FAQWrapper {
  flex: 0 40rem;
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
  border-radius: 1em;
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
}
</style>