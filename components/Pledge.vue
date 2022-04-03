<template>
  <div>
    <button class="button" @click="pledgeOpened = true">Pledge now</button>
    <transition name="slide-down">
      <label v-if="pledgeCount > 1" class="PledgeProgress">
        <progress
          v-if="pledgeCount < maxPledges"
          :value="pledgeCount"
          :max="maxPledges"
          :style="{
            '--progress-value': `${(pledgeCount / maxPledges) * 100}%`,
          }"
        ></progress>
        {{ pledgeCount }} pledges made
      </label>
    </transition>
    <Modal :opened="pledgeOpened" @closed="close">
      <template #header>
        <h3>Make your pledge</h3>
      </template>
      <div v-if="pledge.fullName" class="Thankyou">
        <h3>Thank you {{ pledge.fullName }}, for pledging!</h3>
      </div>
      <div v-else class="PledgeForm">
        <slot></slot>
        <form class="form" @submit.prevent="submit">
          <div :class="{ hasError: error.path === 'fullName' }">
            <label for="fullName">Full name</label>
            <input
              id="fullName"
              v-model="pledgeForm.fullName"
              type="text"
              required
            />
          </div>
          <div :class="{ hasError: error.path === 'phone' }">
            <label for="phone">Phone number</label>
            <input id="phone" v-model="pledgeForm.phone" type="tel" required />
          </div>
          <div :class="{ hasError: error.path === 'email' }">
            <label for="email">Email address</label>
            <input
              id="email"
              v-model="pledgeForm.email"
              type="email"
              required
            />
          </div>
          <div :class="{ hasError: error.path === 'dateOfBirth' }">
            <label for="dateOfBirth">Date of birth</label>
            <input
              id="dateOfBirth"
              v-model="pledgeForm.dateOfBirth"
              type="date"
              required
            />
          </div>
          <div :class="{ hasError: error.path === 'address' }">
            <label for="address">Address</label>
            <input id="address" v-model="pledgeForm.address" type="text" />
          </div>
          <div :class="{ hasError: error.path === 'address2' }">
            <label for="address2">Address2</label>
            <input id="address2" v-model="pledgeForm.address2" type="text" />
          </div>
          <div :class="{ hasError: error.path === 'postCode' }">
            <label for="postCode">Postcode</label>
            <input id="postCode" v-model="pledgeForm.postCode" type="text" />
          </div>
          <div :class="{ hasError: error.path === 'city' }">
            <label for="city">City</label>
            <input id="city" v-model="pledgeForm.city" type="text" />
          </div>
          <div :class="{ hasError: error.path === 'state' }">
            <label for="state">State</label>
            <input id="state" v-model="pledgeForm.state" type="text" />
          </div>
          <div v-if="maxPledges > pledgeCount" :class="{ hasError: error.path === 'tshirtSize' }">
            <h4>T-shirt size</h4>
            <p>If you would like to recieve a t-shirt, pick a size</p>
            <div v-for="size in sizes" :key="size" class="radio">
              <input
                :id="size"
                v-model="pledgeForm.tshirtSize"
                type="radio"
                name="tshirtSize"
                :value="size"
              />
              <label :for="size">{{ size.toUpperCase() }}</label>
            </div>
          </div>

          <transition name="slide-up">
            <span v-if="error.message" class="FormError" @click="error = {}">
              {{ error.message }}
            </span>
          </transition>

          <button class="button" type="submit" :disabled="submitting">
            {{ submitting ? 'Submitting...' : 'Submit' }}
          </button>
        </form>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as yup from 'yup'
const sizes = ['s', 'm', 'l', 'xl', 'xxl', 'xxxl']
const pledgeSchema = (hideTshirt: boolean) => yup.object({
  fullName: yup.string().required(),
  phone: yup
    .string()
    .matches(
      /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/,
      'Invalid phone number'
    )
    .required(),
  email: yup.string().email().required(),
  dateOfBirth: yup.date().required(),
  address: yup.string().required(),
  address2: yup.string(),
  postCode: yup
    .string()
    .matches(/^[0-9]{5}/, 'Invalid postcode')
    .required(),
  city: yup.string().required(),
  state: yup.string().required(),
  tshirtSize: hideTshirt ? yup.mixed().nullable() : yup.mixed().oneOf(sizes, 'Select a t-shirt size').required(),
})

const pledgeFormDefault = () => ({
  fullName: '',
  phone: '',
  email: '',
  dateOfBirth: '',
  address: '',
  address2: '',
  postCode: '',
  city: '',
  state: '',
  tshirtSize: '',
})

export default Vue.extend({
  props: {
    pledgeCount: {
      type: Number,
      default: 0,
    },
    maxPledges: {
      type: Number,
      default: 0
    },
    recount: {
      type: Function,
      default() { return 'Default function' }
    }
  },
  data() {
    return {
      pledgeOpened: false,
      submitting: false,
      pledge: {},
      sizes,
      error: {},
      pledgeForm: pledgeFormDefault(),
    }
  },
  methods: {
    openForm() {
      this.pledgeOpened = true
    },
    close() {
      this.pledge = {}
      this.pledgeOpened = false
      this.pledgeForm = pledgeFormDefault()
    },
    async submit() {
      this.submitting = true
      this.error = {}

      try {
        await pledgeSchema(this.pledgeCount > this.maxPledges).validate(this.pledgeForm)
        try {
          this.pledge = (
            await this.$axios.post(`/api/pledges`, {
              ...this.pledgeForm,
              dateOfBirth: new Date(this.pledgeForm.dateOfBirth),
              postCode: parseInt(this.pledgeForm.postCode),
            })
          ).data.pledge
          this.recount()
          this.submitting = false
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e)
          this.submitting = false
        }
      } catch (e) {
        this.error = {
          message: e.message,
          path: e.path,
        }
        this.submitting = false
      }
    },
  },
})
</script>

<style scoped>
.Thankyou,
.PledgeForm {
  padding: 2rem 1rem;
}

.PledgeProgress {
  margin: 1rem 0 0;
  display: flex;
  flex-flow: column;
  gap: 0.5rem;
}

.PledgeProgress progress {
  position: relative;
  width: 100%;
}

.PledgeProgress progress::before,
.PledgeProgress progress::after {
  content: '';
  position: absolute;
  border-radius: 0.5rem;
  top: 0;
  left: 0;
  bottom: 0;
}

.PledgeProgress progress::before {
  right: 0;
  background: var(--gray-light);
}

.PledgeProgress progress::after {
  background: var(--blue-dark);
  width: var(--progress-value);
}

.FormError {
  position: sticky;
  bottom: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background: var(--red);
  color: var(--white);
}

.hasError h4,
.hasError > label {
  color: var(--red);
}

.hasError input {
  --shadow: var(--red);
}
</style>
