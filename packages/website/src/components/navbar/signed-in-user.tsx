import { component$ } from '@builder.io/qwik'
import { routeLoader$ } from '@builder.io/qwik-city'
import { auth } from '~/lucia/index'

export const useSessionLoader = routeLoader$(async (event) => {
  const authRequest = auth.handleRequest(event)
  const session = await authRequest.validate()

  return session ?? null
})

export const SignedInUser = component$(() => {
  const session = useSessionLoader()

  if (session.value != null) {
    return (
      <div class="dropdown dropdown-end">
        <label class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src="https://inaturalist-open-data.s3.amazonaws.com/photos/331450763/small.jpg" alt="bro" width="48" height="48" />
          </div>
        </label>
        <ul class="p-2 mt-3 w-52 shadow z-[1] menu menu-sm dropdown-content bg-base-100 rounded-box">
          <li>
            <a href="/account">
              Account settings
            </a>
          </li>
          <li>
            // <a onClick$={async () => { await signout.submit({ callbackUrl: '/' }) }}>
            //   Logout
            // </a>
          </li>
        </ul>
      </div>
    )
  }

  return (
    <a href="/signin" class="btn btn-primary">Sign in</a>
  )
})
