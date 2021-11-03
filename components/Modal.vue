<template>
  <section v-show="opened" class="Modal">
    <transition name="slide-down">
      <div v-if="opened" class="ModalContent">
        <header class="ModalHeader">
          <slot name="header"></slot>
          <button class="button" @click="$emit('closed')">
            <svg viewBox="0 0 24 24">
              <use xlink:href="#close"></use>
            </svg>
          </button>
        </header>
        <div class="ModalBody">
          <slot></slot>
        </div>
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
  display: flex;
  flex-flow: column;
  position: relative;
  max-height: 100vh;
}

.ModalHeader {
  background: var(--white);
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 0.2em solid var(--gray-light);
  position: sticky;
  top: 0;
}

.ModalBody {
  overflow-y: auto;
}

@media screen and (min-width: 60rem) {
  .Modal {
    padding: 6rem 2rem;
  }

  .ModalContent {
    flex: 0 40rem;
    border-radius: 0.8rem;
    box-shadow: 0 0 0.2em var(--gray);
    overflow: hidden;
  }

  .ModalBody {
    max-height: 70vh;
  }
}
</style>