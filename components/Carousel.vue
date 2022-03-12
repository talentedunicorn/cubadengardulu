<template>
  <section class="Carousel">
    <transition-group name="slide-up" appear>
      <div v-for="item in items" v-show="item === current" :key="item.sys.id">
        <slot :data="item" />
      </div>
    </transition-group>
    <nav v-if="items.length > 1" aria-label="Carousel navigation">
      <button class="button" aria-label="Previous" @click="previous">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <use xlink:href="#arrow-left"></use>
        </svg>
      </button>
      <button class="button" aria-label="Next" @click="next">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <use xlink:href="#arrow-right"></use>
        </svg>
      </button>
    </nav>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    items: {
      type: Array,
      default: [] as Array<any>,
    },
  },
  data() {
    return {
      current: this.items[0],
    }
  },
  computed: {
    itemIndex() {
      return this.items.findIndex((i: any) => i === this.current)
    },
  },
  methods: {
    previous() {
      this.current =
        this.items[
          this.itemIndex > 0 ? this.itemIndex - 1 : this.items.length - 1
        ]
    },
    next() {
      this.current =
        this.items[
          this.itemIndex < this.items.length - 1 ? this.itemIndex + 1 : 0
        ]
    },
  },
})
</script>

<style scoped>
.Carousel {
  display: flex;
  flex-flow: column;
  gap: 1rem;
}

nav {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

nav .button {
  --icon-size: 1.7rem;
  padding: 0;
}

@media screen and (min-width: 60rem) {
  nav {
    order: -1;
    margin-left: auto;
  }
}
</style>
