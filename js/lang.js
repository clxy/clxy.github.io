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
};

function detectLang() {
  var lang = (navigator.language || navigator.userLanguage).toLowerCase();
  var result = langMap[lang];

  if(result) return result;
  lang = lang.split('-')[0];
  result = langMap[lang];

  return result || 'en';
}

function changeLang(lang) {
  var curLoc = window.location.href.split('/');
  var curLang = curLoc[3];
  if(lang == curLang) return;
  curLoc[3] = lang; // https://domain/lang/ ⇒ https,,domain,lang ⇒ 语言是第四个
  window.location.href = curLoc.join('/');
}
