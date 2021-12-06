<template>
  <transition name="slide-down">
      <button
        v-show="showScrollTop"
        v-scroll-to:true="scrollToId"
        class="ScrollTop button"
        aria-label="Scroll to top"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <use xlink:href="#arrow-up"></use>
        </svg>
      </button>
    </transition>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    scrollToId: {
      type: String,
      required: true
    }
  },
  data(): { showScrollTop: boolean } {
    return {
      showScrollTop: false,
    }
  },
  mounted() {
    // Attach scroll listener
    document.querySelector(`#${this.scrollToId}`)?.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    document.querySelector(`#${this.scrollToId}`)?.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const scrolledFromTop: number | undefined = document.querySelector(`#${this.scrollToId}`)?.scrollTop
      this.showScrollTop = scrolledFromTop ? scrolledFromTop > window.innerHeight : false
    },
  },
})
</script>

<style scoped>
.ScrollTop {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 0;
  z-index: 3;
}

.ScrollTop svg {
  --icon-size: 2rem;
}
</style>