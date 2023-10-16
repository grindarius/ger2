import { Signal, createContextId, useContext, useContextProvider, useSignal, useStore, useVisibleTask$ } from '@builder.io/qwik'

export type ThemeType = 'ger2-dark' | 'ger2-light' | ''

export const DATA_THEME_LOCALSTORAGE_KEY = 'data-theme'

export const ThemeContext = createContextId<Signal<ThemeType>>('theme-context')

export const useThemeProvider = (): void => {
  const theme = useSignal<ThemeType>('')

  useContextProvider(
    ThemeContext,
    theme
  )

  useVisibleTask$(({ track }) => {
    const change = track(() => theme.value)

    // Set theme to empty string on initialized, make sure we grabbed the actual value
    if (theme.value === '') {
      const localStorageTheme = localStorage.getItem(DATA_THEME_LOCALSTORAGE_KEY) as ThemeType
      theme.value = localStorageTheme == null || localStorageTheme === '' ? 'ger2-dark' : localStorageTheme
    }

    // Ignore non-initialized value
    if (change === '') return

    // Make sure we only update the html class if we have to avoid unnecessary paint calls
    if (document.documentElement.getAttribute('data-theme') !== change) {
      document.documentElement.setAttribute('data-theme', change)
    }

    // Update local storage
    localStorage.setItem('theme', change)
  })
}

export const useTheme = (): Signal<ThemeType> => useContext(ThemeContext)
