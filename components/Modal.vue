<template>
  <section v-show="opened" class="Modal">
    <transition name="slide-down">
      <div v-show="opened" class="ModalContent">
        <header class="ModalHeader">
          <slot name="header"></slot>
          <button class="button" @click="$emit('closed')">
            <svg viewBox="0 0 24 24">
              <use xlink:href="#close"></use>
            </svg>
          </button>
        </header>
        <slot></slot>
      </div>
    </transition>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    opened: {
      type: Boolean,
      default: false,
    }
  }
})
</script>

<style scoped>
.Modal {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 4;
  padding: 6rem 2rem;
  backdrop-filter: blur(0.3em);
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.button {
  padding: 0;
}

.ModalHeader svg {
  inline-size: 2rem;
}

.ModalContent {
  background: var(--white);
  border-radius: 0.8rem;
  box-shadow: 0 0 0.2em var(--gray);
  flex: 0 30rem;
}

.ModalHeader {
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}
</style>