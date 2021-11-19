import Vue from 'vue'

const scrollTo = (ev: MouseEvent, target: string, scroll?: boolean): void => {
  const targetEl = document.querySelector(`#${target}`)
  ev.preventDefault()
  targetEl &&
    scroll ? 
    targetEl.scroll({
      top: 0,
      behavior: 'smooth',
    }) :
    targetEl.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    })
}

Vue.directive('scrollTo', {
  bind: (el, binding) => {
    el.addEventListener('click', (e) => scrollTo(e, binding.value, binding.arg === 'true'))
  },
  unbind: (el, binding) =>
    el.removeEventListener('click', (e) => scrollTo(e, binding.value, binding.arg === 'true')),
})
