import { component$ } from '@builder.io/qwik'

import { useAuthSession } from '~/routes/plugin@auth'

export const SignedInUser = component$(() => {
  const session = useAuthSession()

  if (session.value != null) {
    return (
      <div class="flex-none gap-2">
        <div class="dropdown dropdown-end">
          <label tabIndex={0} class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img alt="bro" width="48" height="48" />
            </div>
          </label>
          <ul tabIndex={0} class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
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
      </div>
    )
  }

  return (
    <div class="flex-none gap-2">
      <a href="/signin" class="btn btn-primary">Sign in</a>
    </div>
  )
})
