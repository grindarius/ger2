import { $, component$ } from '@builder.io/qwik'
import type { Session } from 'lucia'
import { useSignoutAction } from '~/routes'

interface SignedInUserProps {
  session: Session | null
}

export const SignedInUser = component$<SignedInUserProps>(props => {
  const signoutAction = useSignoutAction()

  if (props?.session != null) {
    return (
      <div class="dropdown dropdown-end">
        <div tabIndex={0} role="button" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img
              src="https://inaturalist-open-data.s3.amazonaws.com/photos/331450763/small.jpg"
              alt="bro"
              width="48"
              height="48"
            />
          </div>
        </div>
        <ul class="p-2 mt-3 w-52 shadow z-[1] menu menu-sm dropdown-content bg-base-100 rounded-box">
          <li>
            <a href="/account">Account settings</a>
          </li>
          <li>
            <button
              type="button"
              onClick$={async () => {
                await signoutAction.submit()
              }}
            >
              Sign out
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
