import { component$ } from '@builder.io/qwik'
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister
} from '@builder.io/qwik-city'

import { RouterHead } from './components/router-head/router-head'
import { useThemeProvider } from './theme-provider'

import './global.css'

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  useThemeProvider()

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
        <script dangerouslySetInnerHTML={`
          // set to dark or light depends on prefers-color-scheme
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            localStorage.setItem('theme', 'ger2-dark')
          }

          if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            localStorage.setItem('theme', 'ger2-light')
          }

          document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'ger2-dark')`}
        />
      </head>
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  )
})
