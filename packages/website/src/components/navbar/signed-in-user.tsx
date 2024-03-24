import { component$ } from '@builder.io/qwik'
import { routeAction$, routeLoader$ } from '@builder.io/qwik-city'
import { getSession, lucia } from '~/routes/plugin@lucia'

export const useSessionLoader = routeLoader$(async event => {
  const session = await getSession(event)
  return session
})

export const signoutAction = routeAction$(async (_data, event) => {
  const cookieValue = event.cookie.get(lucia.sessionCookieName)

  if (cookieValue?.value == null) {
    throw event.error(401, 'Unauthorized')
  }

  const { user, session } = await lucia.validateSession(cookieValue?.value ?? '')
  if (user == null && session == null) {
    throw event.error(401, 'Unauthorized')
  }

  await lucia.invalidateSession(session.id)
  event.headers.append('Set-Cookie', lucia.createBlankSessionCookie().serialize())
})

export const SignedInUser = component$(() => {
  const session = useSessionLoader()

  if (session.value != null) {
    return (
      <div class="dropdown dropdown-end">
        <label class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
              src="https://inaturalist-open-data.s3.amazonaws.com/photos/331450763/small.jpg"
              alt="bro"
              width="48"
              height="48"
            />
          </div>
        </label>
        <ul class="p-2 mt-3 w-52 shadow z-[1] menu menu-sm dropdown-content bg-base-100 rounded-box">
          <li>
            <a href="/account">Account settings</a>
          </li>
          <li>
            <button type="button" onClick$={signoutAction}>
              Signout
            </button>
          </li>
        </ul>
      </div>
    )
  }

  return (
    <a href="/signin" class="btn btn-primary">
      Sign in
    </a>
  )
})
