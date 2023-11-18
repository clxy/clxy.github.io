const KEY_STORAGE_PREFIX = 'clxy.app'
const fixStorageKey = (k) => `${KEY_STORAGE_PREFIX}.${k}`
const webStorage = {
  local: {
    get: (key, defaultValue) => {
      const v = window.localStorage.getItem(fixStorageKey(key))
      return v ? JSON.parse(v) : defaultValue
    },

    set: (key, value) => {
      window.localStorage.setItem(fixStorageKey(key), JSON.stringify(value))
    },

    remove: (key) => window.localStorage.removeItem(fixStorageKey(key)),
  },
  // sessionStorage现在没用上
}

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

$(function () {
  $(window).ready(function () {
    const curTheme = getCurTheme()
    document.documentElement.setAttribute('data-bs-theme', curTheme)
    $('.theme-switcher button').on('click', toggleTheme)
      .filter(`.app-${curTheme}`).toggleClass('d-none', false)
  })
})