<template>
  <div class="container">
    <header class="header"> 
      <h2 class="header-title">Welcome, {{ $auth.user.given_name }}</h2>
      <button class="button" @click="$auth.logout()">Log out</button>
    </header>
    <section class="content">
      <h3>{{ total }} pledges made</h3>
      <template v-if="total < 1">
        <p>No pledges found</p>
      </template>
      <template v-else>
        <div class="controls">
          <span>
            Page
            <select @change="goTo($event)">
              <option v-for="p in pages" :key="p" :value="p" :selected="p === page">{{ p }}</option>
            </select> 
            of {{ totalPages }}
          </span>
          <nav class="pagination">
            <button class="button" :disabled="page === 1"  @click="previous">Previous</button>
            <button class="button" :disabled="page === totalPages" @click="next">Next</button>
          </nav>
        </div>

        <template v-if="$fetchState.pending">
          <p>Loading data...</p>
        </template>
        <ul v-else>
          <li v-for="pledge in pledges" :key="pledge.id">
            <p>{{ pledge.fullName }}</p>
          </li>
        </ul>
      </template>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Pledge } from "@prisma/client"
export default Vue.extend({
  middleware: ['auth'],
  async asyncData({ $axios }) {
    const { total } = (await $axios.get(`/api/pledges`)).data
    return { total }
  },
  data() {
    return {
      page: 0,
      limit: 10,
      total: 0,
      pledges: [] as Pledge[],
    }
  },
  async fetch() {
    this.pledges = (await this.$axios.get(`/api/admin/pledges?limit=${this.limit}&page=${this.page}`)).data.pledges
  },
  computed: {
    totalPages(): number {
      return Math.ceil(this.total / this.limit) - 1
    },
    pages(): number[] {
      const list = [];
      let x = 1;
      while(x <= this.totalPages) { list.push(x); x++ }
      return list;
    }
  },
  methods: {
    next(): void {
      if (this.page < this.totalPages) {
        this.page += 1
        this.$fetch()
      }
    },
    previous(): void {
      if (this.page > 1) {
        this.page -= 1
        this.$fetch()
      }
    },
    goTo({ target }: { target: HTMLInputElement }): void {
      this.page =  parseInt(target.value, 10)
      this.$fetch()
    }
  }
})
</script>

<style scoped>
.header,
.controls,
.pagination {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.header,
.controls {
  justify-content: space-between;
}

.header,
.content {
  padding: 2rem;
}

.header {
  border-bottom: 1px solid var(--gray-light);
}

.header-title {
  color: var(--gray);
}
</style>