import { component$ } from '@builder.io/qwik'

import { SignedInUser } from '~/components/signed-in-user/signed-in-user'

export const Navbar = component$(() => {
  return (
    <div class="navbar bg-base-200">
      <div class="flex-1">
        <a href="/" class="text-xl normal-case btn btn-ghost">ger2</a>
      </div>
      <SignedInUser />
    </div>
  )
})
