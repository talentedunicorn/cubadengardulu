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
      <div class="full">
        <label for="fullName" :class="{error: errors.fullName}">Full name</label>
        <input id="fullName" v-model="data.fullName" type="text" required />
      </div>
      <div>
        <label for="email" :class="{error: errors.email}">Email address</label>
        <input id="email" v-model="data.email" type="email" required />
      </div>
      <div>
        <label for="phone" :class="{error: errors.phone}">Phone number (optional)</label>
        <input id="phone" v-model="data.phone" type="tel" />
      </div>
      <div class="full">
        <label for="message" :class="{error: errors.message}">Message</label>
        <textarea id="message" v-model="data.message" rows="3"></textarea>
      </div>
      <span
          v-if="Object.keys(errors).length"
          class="error-message"
          v-text="Object.values(errors)[0]"
        ></span>
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
  phone: yup.string().matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/, 'Invalid phone number'),
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
.form {
  position: relative;
}

.button {
  flex: 1;
}

.success {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 100%;
  background: var(--gray-light);
  padding: 1rem;
  margin: 0;
  border-radius: 0.8rem;
}

.success > svg {
  inline-size: var(--success-icon-size, 6rem);
  fill: var(--blue-dark);
}

.success .button {
  --icon-size: 1.5rem;
  align-self: flex-start;
  padding: 0;
  margin-left: auto;
  flex: 0;
}

.error-message {
  padding: 0.5rem 1rem;
  position: sticky;
  bottom: 1rem;
  background: var(--red);
  color: var(--white);
  border-radius: 0.5rem;
}

@media screen and (min-width: 60rem) {
  .form {
    flex-flow: row;
    flex-wrap: wrap;
    align-items: flex-end;
  }

  .form > * {
    flex: calc((100% / 2) - 2rem);
  }

  .success {
    --success-icon-size: 2rem;
  }

  .full {
    flex: 100%;
  }

  .button {
    flex: 0;
    margin-left: auto;
  }
}
</style>
