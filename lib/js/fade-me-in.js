const offset = 20

const fadeMeIn = () => {
  const $window = $(window)

  $('.fade-me-in').each(function () {
    const $this = $(this)
    const bottomOfObject = $this.offset().top + offset /*$this.outerHeight()*/
    const bottomOfWindow = $window.scrollTop() + $window.height()

    /* If the object is completely visible in the window, fade it it */
    if (bottomOfWindow > bottomOfObject) {
      $this.animate({ 'opacity': '1' }, { duration: 2000, easing: "linear" })
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