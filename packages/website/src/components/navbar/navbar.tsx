import { component$, useContext } from '@builder.io/qwik'

import { SignedInUser } from '~/components/signed-in-user/signed-in-user'
import { ThemeContext } from '~/theme-provider'
import { MaterialSymbolsDarkModeOutlineRounded } from '../icons/mateiral-symbols/dark-mode-outline-rounded'
import { MaterialSymbolsWbSunny } from '../icons/mateiral-symbols/wb-sunny'

export const Navbar = component$(() => {
  const themeContext = useContext(ThemeContext)

  return (
    <div class="navbar bg-neutral">
      <div class="flex-1">
        <a href="/" class="text-xl normal-case btn btn-ghost">ger2</a>
      </div>
      <div class="flex-none gap-x-2">
        <button type="button" class="btn btn-circle btn-ghost" onClick$={() => { themeContext.value = themeContext.value === '' ? 'ger2-dark' : themeContext.value === 'ger2-dark' ? 'ger2-light' : 'ger2-dark' } }>
          { themeContext.value === '' || themeContext.value === 'ger2-dark' ? <MaterialSymbolsDarkModeOutlineRounded class="w-6 h-5" /> : <MaterialSymbolsWbSunny class="w-6 h-6" /> }
        </button>
        <SignedInUser />
      </div>
    </div>
  )
})
