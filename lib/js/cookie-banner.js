import webStorage from '/lib/js/web-storage.js'

const KEY_STORAGE = 'cookie'

const template = `
<div id="app-cookie-banner" class="alert alert-info text-center mb-0" role="alert">
  🍪 This website uses cookies to ensure you get the best experience on our website.
  <a href="https://www.cookiesandyou.com/" target="blank">Learn more</a>
  <button type="button" class="btn btn-primary btn-sm ms-3">
    Accept
  </button>
</div>
`

export const addCookieTo = (parent) => {
  const yes = webStorage.local.get(KEY_STORAGE)
  if (yes) return

  $(parent).append(template)
  const $banner = $('#app-cookie-banner')
  $banner.find('button').click(() => {
    webStorage.local.set(KEY_STORAGE, 'yes')
    $banner.remove()
  })
}