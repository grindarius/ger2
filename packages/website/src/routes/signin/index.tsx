import { component$ } from '@builder.io/qwik'
import { type DocumentHead, Form, useLocation } from '@builder.io/qwik-city'

import { useAuthSignin } from '../plugin@auth'

export default component$(() => {
  const location = useLocation()
  const signIn = useAuthSignin()

  return (
    <main class="hero min-h-screen bg-base-200">
      <div class="hero-content flex-col lg:flex-row-reverse">
        <div class="card flex-shrink-0 w-full shadow-2xl bg-base-100">
          <Form action={signIn} class="card-body">
            <div class="form-control">
              <input type="hidden" name="providerId" value="credentials" />
              <input type="hidden" name="options.callbackUrl" value={location.url.origin} />
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input type="text" placeholder="email" name="options.usernameOrEmail" class="input input-bordered" />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input type="password" placeholder="password" name="options.password" class="input input-bordered" />
              <label class="label">
                <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div class="form-control mt-6">
              <button type="submit" class="btn btn-primary">Sign in</button>
            </div>
          </Form>
        </div>
      </div>
    </main>
  )
})

export const head: DocumentHead = {
  title: 'Sign in ● ger2'
}
