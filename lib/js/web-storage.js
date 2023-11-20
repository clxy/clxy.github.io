const KEY_STORAGE_PREFIX = 'clxy.app'
const fixStorageKey = (k) => `${KEY_STORAGE_PREFIX}.${k}`
const webStorage = {
  local: {
    get: (key, defaultValue) => {
      const v = window.localStorage.getItem(fixStorageKey(key))
      return v ? JSON.parse(v) : defaultValue
    },

    set: (key, value) => {
      window.localStorage.setItem(fixStorageKey(key), JSON.stringify(value))
    },

    remove: (key) => window.localStorage.removeItem(fixStorageKey(key)),
  },
  // sessionStorage现在没用上
}

export default webStorage