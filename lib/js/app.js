import webStorage from '/lib/js/web-storage.js'
import { addThemeTo, } from '/lib/js/theme.js'
import { addNavLangTo } from '/lib/js/lang.js'
import { addCookieTo } from '/lib/js/cookie-banner.js'

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
    const $navbar = $("#navbarSupportedContent ul")
    addThemeTo($navbar)
    addNavLangTo($navbar)
    addCookieTo($('body'))
  })
})
