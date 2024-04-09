import { component$, useContext } from '@builder.io/qwik'

import type { Session } from 'lucia'
import { ThemeContext } from '~/providers/theme-provider'
import { MaterialSymbolsDarkModeOutlineRounded } from '../icons/material-symbols/dark-mode-outline-rounded'
import { MaterialSymbolsWbSunny } from '../icons/material-symbols/wb-sunny'
import { SignedInUser } from './signed-in-user'

interface NavbarProps {
  session: Session | null
}

export const Navbar = component$<NavbarProps>(props => {
  const themeContext = useContext(ThemeContext)

  return (
    <div class="navbar bg-neutral">
      <div class="flex-1">
        <a href="/" class="text-xl normal-case btn btn-ghost">
          ger2
        </a>
      </div>
      <div class="flex-none gap-x-2">
        <button
          type="button"
          class="btn btn-circle btn-ghost"
          onClick$={() => {
            themeContext.value =
              themeContext.value === ''
                ? 'ger2-dark'
                : themeContext.value === 'ger2-dark'
                  ? 'ger2-light'
                  : 'ger2-dark'
          }}
        >
          {themeContext.value === '' || themeContext.value === 'ger2-dark' ? (
            <MaterialSymbolsDarkModeOutlineRounded class="w-6 h-5" />
          ) : (
            <MaterialSymbolsWbSunny class="w-6 h-6" />
          )}
        </button>
        <SignedInUser session={props.session} />
      </div>
    </div>
  )
})
