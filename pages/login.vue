<template>
  <div class="container">
    <button class="button" @click="$auth.loginWith('google')">
      Log in with Google
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  middleware: ['loginGuard'],
})
</script>

<style scoped>
.container {
  padding: 2rem;
}
</style>
