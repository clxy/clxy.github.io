import webStorage from '/lib/js/web-storage.js'

const template = `
<li class="nav-item theme-switcher">
  <button class="bi bi-moon-stars-fill btn app-dark d-none"></button>
  <button class="bi bi-brightness-high btn app-light d-none"></button>
</li>
`

const KEY_STORAGE_THEME = 'theme'
const Theme = { dark: 'dark', light: 'light', }
const getCurTheme = () => {
  const nvlTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.dark : Theme.light
  return webStorage.local.get(KEY_STORAGE_THEME, nvlTheme)
}

const toggleTheme = () => {
  const curTheme = getCurTheme()
  const newTheme = curTheme == Theme.dark ? Theme.light : Theme.dark

  document.documentElement.setAttribute('data-bs-theme', newTheme)
  webStorage.local.set(KEY_STORAGE_THEME, newTheme)

  const switcher = $('.theme-switcher')
  switcher.find('button').toggleClass('d-none', true)
    .filter(`.app-${newTheme}`).toggleClass('d-none', false)
}

export const addThemeTo = (parent) => {
  const $parent = $(parent)
  if ($parent.attr('data-app-theme-no') !== undefined) return

  $parent.append(template)

  const curTheme = getCurTheme()
  document.documentElement.setAttribute('data-bs-theme', curTheme)
  $('.theme-switcher button').on('click', toggleTheme)
    .filter(`.app-${curTheme}`).toggleClass('d-none', false)
}