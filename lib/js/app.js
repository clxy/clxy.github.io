import { addThemeTo, } from '/lib/js/theme.js'
import { addNavLangTo } from '/lib/js/lang.js'
import { addCookieTo } from '/lib/js/cookie-banner.js'

const fadeMeIn = () => {
  const $window = $(window)

  $('.fade-me-in').each(function () {
    const $this = $(this)
    var bottomOfObject = $this.offset().top + $this.outerHeight()
    var bottomOfWindow = $window.scrollTop() + $window.height()

    /* If the object is completely visible in the window, fade it it */
    if (bottomOfWindow > bottomOfObject) {
      $this.animate({ 'opacity': '1' }, 1500)
    }
  })
}

$(function () {
  const $window = $(window)
  $window.ready(function () {

    const $navbar = $("#navbarSupportedContent ul")
    addThemeTo($navbar)
    addNavLangTo($navbar)

    addCookieTo($('body'))

    $window.scroll(() => {
      fadeMeIn()
    })
    fadeMeIn()
  })
})
