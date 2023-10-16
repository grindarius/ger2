import { component$ } from '@builder.io/qwik'

import { useAuthSession } from '~/routes/plugin@auth'

export const SignedInUser = component$(() => {
  const session = useAuthSession()

  if (session.value != null) {
    return (
      <div class="dropdown dropdown-end">
        <label tabIndex={0} class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img alt="bro" width="48" height="48" />
          </div>
        </label>
        <ul tabIndex={0} class="p-2 mt-3 w-52 shadow z-[1] menu menu-sm dropdown-content bg-base-100 rounded-box">
          <li>
            <a class="justify-between">
              Profile
              <span class="badge">New</span>
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a>Logout</a></li>
        </ul>
      </div>
    )
  }

  return (
    <a href="/signin" class="btn btn-primary">Sign in</a>
  )
})
