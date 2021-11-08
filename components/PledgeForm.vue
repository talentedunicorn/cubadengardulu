<template>
  <form class="form" @submit.prevent="submit">
    <div>
      <label for="fullName">Full name</label>
      <input id="fullName" type="text" required />
    </div>
    <div>
      <label for="phone">Phone number</label>
      <input id="phone" type="tel" required />
    </div>
    <div>
      <label for="email">Email address</label>
      <input id="email" type="email" required />
    </div>
    <div>
      <label for="dateOfBirth">Date of birth</label>
      <input id="dateOfBirth" type="date" required />
    </div>
    <div>
      <label for="address1">Address</label>
      <input id="address1" type="text" />
    </div>
    <div>
      <label for="postcode">Postcode</label>
      <input id="postcode" type="text" />
    </div>
    <div>
      <label for="city">City</label>
      <input id="city" type="text" />
    </div>
    <div>
      <label for="state">State</label>
      <input id="state" type="text" />
    </div>

    <button class="button" type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    submit() {
      // TODO: Send data
      this.$emit('submitted')
    },
  },
})
</script>
