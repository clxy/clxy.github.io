import { addThemeTo, } from '/lib/js/theme.js'
import { addNavLangTo } from '/lib/js/lang.js'
import { addCookieTo } from '/lib/js/cookie-banner.js'
import { setupFadeMeIn } from '/lib/js/fade-me-in.js'

$(function () {
  const $window = $(window)
  $window.ready(function () {

    const $navbar = $("#navbarSupportedContent ul")
    $navbar.append(`
      <li class="nav-item py-2 py-lg-1 col-12 col-lg-auto">
        <div class="vr d-none d-lg-flex h-100 mx-lg-2"></div>
        <hr class="d-lg-none my-2">
      </li>
    `)

    addThemeTo($navbar)
    addNavLangTo($navbar)

    addCookieTo($('body'))

    setupFadeMeIn()
  })
})
