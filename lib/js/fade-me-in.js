const offset = 50

const fadeMeIn = () => {
  const $window = $(window)

  $('.fade-me-in').each(function () {
    const $this = $(this)
    const bottomOfObject = $this.offset().top + offset /*$this.outerHeight()*/
    const bottomOfWindow = $window.scrollTop() + $window.height()

    /* If the object is completely visible in the window, fade it it */
    if (bottomOfWindow > bottomOfObject) {
      const duration = ($this.data('app-fade-duration') || 3) * 1000
      $this.animate({ 'opacity': '1' }, { duration: duration, easing: "swing" })
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