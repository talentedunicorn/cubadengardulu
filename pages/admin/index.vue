<template>
  <div class="container" style="padding: 2rem;">
    <h2>Welcome, boss!</h2>
    <button class="button" @click="$auth.logout()">Log out</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  middleware: ['auth']
})
</script>