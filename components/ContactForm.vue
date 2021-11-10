<template>
  <transition name="slide-down">
    <p v-if="submitted" class="success">
      <svg viewBox="0 0 24 24">
        <use xlink:href="#check"></use>
      </svg>
      Thank you, we have recieved your message

      <button class="button" @click="reset">
        <svg viewBox="0 0 24 24">
          <use xlink:href="#close"></use>
        </svg>
      </button>
    </p>
    <form v-else class="form" @submit.prevent="submit">
      <div>
        <label for="fullName">Full name</label>
        <input id="fullName" v-model="data.fullName" type="text" required />
      </div>
      <div>
        <label for="email">Email address</label>
        <input id="email" v-model="data.email" type="email" required />
      </div>
      <div>
        <label for="phone">Phone number (optional)</label>
        <input id="phone" v-model="data.phone" type="tel" />
      </div>
      <div>
        <label for="message">Message</label>
        <textarea id="message" v-model="data.message" rows="3"></textarea>
        <span
          v-if="errors.message"
          class="error"
          v-text="errors.message"
        ></span>
      </div>
      <button
        class="button"
        type="submit"
        :disabled="submitting"
        v-text="submitting ? 'Submitting...' : 'Submit'"
      ></button>
    </form>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import * as yup from 'yup'
import { OptionalObjectSchema } from 'yup/lib/object'

const schema: OptionalObjectSchema<any> = yup.object({
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string(),
  message: yup.string().required(),
})
const defaultData = {
  fullName: '',
  email: '',
  phone: '',
  message: '',
}
export default Vue.extend({
  data() {
    return {
      data: { ...defaultData },
      errors: {},
      submitting: false,
      submitted: false,
    }
  },
  methods: {
    reset() {
      this.data = { ...defaultData }
      this.submitted = false
    },
    submit() {
      this.submitting = true
      this.errors = {}
      schema
        .validate(this.data)
        .then(() => {
          return this.$axios.$post(
            `${process.env.FORMSPREE_ENDPOINT}`,
            this.data
          )
        })
        .then((data: any) => {
          this.submitted = data.ok
        })
        .catch((err: any) => {
          this.errors = { [err.path]: err.errors[0] }
        })
        .finally(() => {
          this.submitting = false
        })
    },
  },
})
</script>

<style scoped>
.button {
  flex: 1;
}

.success {
  display: flex;
  gap: 1rem;
  flex: 100%;
  background: var(--gray-light);
  padding: 1rem;
  margin: 0;
  border-radius: 0.8rem;
}

.success > svg {
  inline-size: 1.3rem;
  fill: var(--blue-dark);
}

.success .button {
  align-self: flex-start;
  padding: 0;
  margin-left: auto;
  flex: 0;
}

.success .button svg {
  inline-size: 1.5rem;
}

@media screen and (min-width: 60rem) {
  form {
    flex-flow: row;
    flex-wrap: wrap;
    align-items: flex-end;
  }

  form > * {
    flex: calc((100% / 3) - 2rem);
  }

  .button {
    flex: 0 calc((100% / 3) - 2rem);
  }
}
</style>
