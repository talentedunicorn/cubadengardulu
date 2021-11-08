<template>
  <main id="top">
    <Icons />
    <Nuxt />
    <transition name="slide-down">
      <button
        v-show="showScrollTop"
        v-scrollTo="'top'"
        class="ScrollTop button"
      >
        <svg viewBox="0 0 24 24">
          <use xlink:href="#arrow-up"></use>
        </svg>
      </button>
    </transition>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data(): { showScrollTop: boolean } {
    return {
      showScrollTop: false,
    }
  },
  mounted() {
    // Attach scroll listener
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.showScrollTop = window.scrollY > window.innerHeight
    },
  },
})
</script>

<style>
.ScrollTop {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  padding: 0;
  z-index: 3;
}

.ScrollTop svg {
  inline-size: 2rem;
}
</style>
