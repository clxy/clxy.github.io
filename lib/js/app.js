import { addThemeTo, } from '/lib/js/theme.js'
import { addNavLangTo } from '/lib/js/lang.js'
import { addCookieTo } from '/lib/js/cookie-banner.js'
import { setupFadeMeIn } from '/lib/js/fade-me-in.js'

$(function () {
  const $window = $(window)
  $window.ready(function () {

    const $navbar = $("#navbarSupportedContent ul")
    addThemeTo($navbar)
    addNavLangTo($navbar)

    addCookieTo($('body'))

    setupFadeMeIn()
  })
})
