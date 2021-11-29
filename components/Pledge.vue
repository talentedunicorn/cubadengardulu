<template>
  <div>
    <button class="button" @click="pledgeOpened = true">
      Pledge now
    </button>
    <transition name="slide-down">
      <label v-if="!$fetchState.pending" class="PledgeProgress">
        <progress :value="pledgeCount" :max="maxPledges"></progress>
        {{ pledgeCount }} pledges made
      </label>
    </transition>
    <Modal :opened="pledgeOpened" @closed="pledgeOpened = false">
      <template #header>
        <h3>Make your pledge</h3>
      </template>
      <div class="PledgeForm">
        <slot></slot>
        <PledgeForm @submitted="pledgeOpened = false" />
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
const maxPledges: number = parseInt(process.env.PLEDGE_LIMIT || '0', 10);

export default Vue.extend({
  data() {
    return {
      maxPledges,
      pledgeCount: 0,
      pledgeOpened: false,
    }
  },
  async fetch() {
    this.pledgeCount = (await this.$axios.get(`/api/pledges`)).data.total
  },
})
</script>

<style scoped>
.PledgeForm {
  padding: 2rem 1rem;
}

.PledgeProgress {
  margin: 1rem 0 0;
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
}
</style>