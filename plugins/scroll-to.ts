import Vue from 'vue'

const scrollTo = (ev: MouseEvent): void => {
  const targetEl = document.querySelector((ev.target as HTMLElement).getAttribute('href'))
  ev.preventDefault()
  targetEl && targetEl.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}

Vue.directive('scrollTo', {
  bind: (el) => {
    el.addEventListener('click', scrollTo)
  },
  unbind: (el) => el.removeEventListener('click', scrollTo)
})