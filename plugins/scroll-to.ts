import Vue from 'vue'

const scrollTo = (ev: MouseEvent, target: string): void => {
  const targetEl = document.querySelector(`#${target}`)
  ev.preventDefault()
  targetEl && targetEl.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
    inline: 'nearest',
  })
}

Vue.directive('scrollTo', {
  bind: (el, binding) => {
    el.addEventListener('click', (e) => scrollTo(e, binding.value))
  },
  unbind: (el, binding) => el.removeEventListener('click', (e) => scrollTo(e, binding.value))
})