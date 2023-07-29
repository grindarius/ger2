import { component$ } from '@builder.io/qwik'

import { SignedInUser } from '~/components/signed-in-user/signed-in-user'

export const Navbar = component$(() => {
  return (
    <div class="navbar bg-base-200">
      <div class="flex-1">
        <a href="/" class="btn btn-ghost normal-case text-xl">ger2</a>
      </div>
      <SignedInUser />
    </div>
  )
})
