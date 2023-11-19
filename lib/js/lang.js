import webStorage from '/lib/js/web-storage.js'

/**
 * 语言跳转，约定如下。
 * https://domain/lang/
 * 对应中文简繁，日文，其他一律英文。
 */
const langLocaleMap = {
  'zh-cn': 'chs',
  'zh-sg': 'chs',
  'zh-hk': 'cht',
  'zh-tw': 'cht',
  'ja': 'ja',
}

const Lang = {
  en: { title: 'English', },
  chs: { title: '简体中文', },
  cht: { title: '繁體中文', },
  ja: { title: '日本語', },
}

const template = Handlebars.compile(`
  <li class="nav-item dropdown" id="appNavLang">
    <a class="nav-link dropdown-toggle bi bi-translate" href="#" id="appNavLangBth" role="button"
      data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    </a>
    <div class="dropdown-menu" aria-labelledby="appNavLangBth" id="langSelect">
    {{#each langs}}
      <a class="dropdown-item" href="#" data-lang="{{lang}}">{{title}}</a>
    {{/each}}
    </div>
  </li>
`)

const KEY_STORAGE_THEME = 'lang'

export const detectLang = () => {
  let lang = webStorage.local.get(KEY_STORAGE_THEME)
  if (lang) return lang

  lang = (navigator.language || navigator.userLanguage).toLowerCase()
  const result = langLocaleMap[lang]
  if (result) return result

  lang = lang.split('-')[0]
  result = langLocaleMap[lang]

  return result || 'en'
}

/**
 * https://domain/module/lang/ .split(/)
 * https,,domain,module,lang ⇒ 语言是第五·个
 */
const LANG_INDEX = 4

export function getUrlLang() {
  const curLoc = window.location.href.split('/')
  return curLoc[LANG_INDEX]
}

export function changeLang(lang) {
  const curLoc = window.location.href.split('/')
  const curLang = curLoc[LANG_INDEX]
  if (lang == curLang) return
  curLoc[LANG_INDEX] = lang

  webStorage.local.set(KEY_STORAGE_THEME, lang)
  window.location.href = curLoc.join('/')
}

export const addNavLangTo = (parent) => {
  const $parent = $(parent)
  if ($parent.find("#appNavLang").length) return

  let langs = $parent.data('app-lang')?.split(',') || []
  if (!langs.length) langs = Object.keys(Lang)

  langs = langs.map(lang => ({ lang, title: Lang[lang].title }))
  $parent.append(template({ langs: langs }))

  const curLang = getUrlLang()
  $('#langSelect a')
    .click(function () {
      changeLang($(this).attr('data-lang'))
    })
    .addClass(function () {
      return $(this).attr('data-lang') == curLang ? 'active' : ''
    })
  $('#appNavLangBth').text(` ${$('#langSelect a.active').text()}`)
}