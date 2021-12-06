<template>
  <main class="wrapper">
    <Icons />
    <aside class="side">
      <transition name="slide-from-left">
      <nav v-show="menuOpened" aria-label="Read our stories">
        <NuxtLink to="/">
          Home
        </NuxtLink>
        <NuxtLink to="/blog">
          Articles
        </NuxtLink>
      </nav>
      </transition>
      <button class="button side-toggle" aria-label="Toggle menu" @click="menuOpened = !menuOpened">
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <use v-if="menuOpened" xlink:href="#arrow-left"></use>
            <use v-else xlink:href="#arrow-right"></use>
          </svg>
      </button>
    </aside>
    <div id="top" class="content">
      <Nuxt />
      <Social class="social" />
      <ScrollToTop scroll-to-id="top"/>
      <Footer />
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data () {
    return {
      menuOpened: true
    }
  }
})
</script>

<style scoped>
.wrapper,
.side,
.side nav,
.content {
  display: flex;
}

.wrapper {
  height: 100vh;
}

.side {
  position: relative;
  background: var(--black);
  color: var(--white);
}

.side nav {
  padding: 2rem 0;
  align-items: center;
  justify-content: space-between;
  writing-mode: vertical-lr;
  gap: 2rem;
}

.side nav::after {
  content: attr(aria-label);
  font-family: var(--font-alt);
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--gray);
  transform: rotate(180deg);
}

.side a {
  text-decoration: none;
}


[aria-current="page"] {
  color: var(--gray);
}

.side-toggle {
  position: absolute;
  left: 100%;
  bottom: 4rem;
  padding: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-width: 0;
}

.side-toggle:hover {
  --button-bg: var(--blue-dark);
  --button-color: var(--white);
}

.side-toggle svg {
  inline-size: 2rem;
}

.social {
  align-self: center;
  padding: 1rem;
  margin: 2rem;
  background: var(--gray-light);
  border-radius: 0.5rem;
}

.content {
  flex: 1;
  flex-flow: column;
  overflow-y: auto;
}

@media screen and (min-width: 60rem) {
  .side nav {
    padding: 2rem 1rem;
  }
}
</style>