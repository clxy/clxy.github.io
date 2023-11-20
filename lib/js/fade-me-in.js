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

export const setupFadeMeIn = () => {
  const $items = $('.fade-me-in')
  if (!$items.length) return

  const $window = $(window)
  $window.scroll(fadeMeIn).resize(fadeMeIn)
  fadeMeIn()
}