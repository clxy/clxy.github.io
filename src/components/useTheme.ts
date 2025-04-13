import { computed } from 'vue'
import { useDark, usePreferredDark, useLocalStorage } from '@vueuse/core'

import { Const } from '@/const'

// 定义类似 enum 的主题模式
export const ThemeModes = {
  light: 'light',
  dark: 'dark',
  system: 'system'
} as const

export type ThemeMode = keyof typeof ThemeModes

export const useTheme = () => {
  // 使用 useDark 管理暗黑模式
  const isDark = useDark()
  const preferredDark = usePreferredDark()

  // 使用 useLocalStorage 持久化主题模式
  // 貌似 @vueuse/core 自己就可以实现。这里练习一下useLocalStorage
  const currentTheme = useLocalStorage<ThemeMode>(`${Const.APP_KEY}.theme`, ThemeModes.system)

  // 切换主题模式
  const setTheme = (theme: ThemeMode) => {
    currentTheme.value = theme
    switch (theme) {
      case ThemeModes.light:
        isDark.value = false
        break
      case ThemeModes.dark:
        isDark.value = true
        break
      case ThemeModes.system:
        isDark.value = preferredDark.value
        break
    }
  }

  // 主题切换菜单项
  const themeItems = computed(() => [
    {
      label: 'Light',
      icon: 'i-mdi-weather-sunny',
      type: 'checkbox' as const,
      checked: currentTheme.value === ThemeModes.light,
      onSelect: () => setTheme(ThemeModes.light),
    },
    {
      label: 'Dark',
      icon: 'i-mdi-moon-and-stars',
      type: 'checkbox' as const,
      checked: currentTheme.value === ThemeModes.dark,
      onSelect: () => setTheme(ThemeModes.dark),
    },
    {
      label: 'System',
      icon: 'i-mdi-monitor-cellphone',
      type: 'checkbox' as const,
      checked: currentTheme.value === ThemeModes.system,
      onSelect: () => setTheme(ThemeModes.system),
    }
  ])

  return {
    currentTheme,
    setTheme,
    themeItems,
    isDark
  }
}