import Vue from 'vue'

Vue.filter('formatDate', (value: string): string => {
  const date = new Date(value)
  return Intl.DateTimeFormat('en-MY', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  }).format(date)
})

Vue.filter('makeHash', (value: string): string => {
  return `#${value.toLocaleLowerCase()}`
})
