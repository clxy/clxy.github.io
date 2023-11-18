/**
 * 语言跳转，约定如下。
 * https://domain/lang/
 * 对应中文简繁，日文，其他一律英文。
 */
var langMap = {
  'zh-cn': 'chs',
  'zh-sg': 'chs',
  'zh-hk': 'cht',
  'zh-tw': 'cht',
  'ja': 'ja'
}

function detectLang() {
  var lang = (navigator.language || navigator.userLanguage).toLowerCase()
  var result = langMap[lang]

  if (result) return result
  lang = lang.split('-')[0]
  result = langMap[lang]

  return result || 'en'
}

/**
 * https://domain/module/lang/ .split(/)
 * https,,domain,module,lang ⇒ 语言是第五·个
 */
const LANG_INDEX = 4

function getUrlLang() {
  var curLoc = window.location.href.split('/')
  return curLoc[LANG_INDEX]
}

function changeLang(lang) {
  var curLoc = window.location.href.split('/')
  var curLang = curLoc[LANG_INDEX]
  if (lang == curLang) return
  curLoc[LANG_INDEX] = lang
  window.location.href = curLoc.join('/')
}

$(function () {
  $(window).ready(function () {
    var curLang = getUrlLang()
    $('#langSelect a')
      .click(function () {
        changeLang($(this).attr('data-lang'))
      })
      .addClass(function () {
        return $(this).attr('data-lang') == curLang ? 'active' : ''
      })
    $('#langDropdown').text($('#langSelect a.active').text())
  })
})