import { component$ } from '@builder.io/qwik'
import { type DocumentHead, Form, routeLoader$, routeAction$, zod$, z } from '@builder.io/qwik-city'
import { auth } from '~/lucia/index'

export const useUserLoader = routeLoader$(async (event) => {
  const authRequest = auth.handleRequest(event)
  const session = await authRequest.validate()

  if (session != null) {
    throw event.redirect(303, '/')
  }
})

export const useLoginAction = routeAction$(
  async (values, event) => {
    const authRequest = auth.handleRequest(event)
    const key = await auth.useKey('credentials', values.username, values.password)

    const session = await auth.createSession({
      userId: key.userId,
      attributes: {}
    })
    authRequest.setSession(session)

    throw event.redirect(303, '/')
  },
  zod$({
    username: z.string(),
    password: z.string().min(8)
  })
)

export default component$(() => {
  const loginAction = useLoginAction()

  return (
    <main class="min-h-screen hero bg-base-200">
      <div class="flex-col lg:flex-row-reverse hero-content">
        <div class="flex-shrink-0 w-full shadow-2xl card bg-base-100">
          <Form action={loginAction} class="card-body">
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input type="text" placeholder="email" class="input input-bordered" />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input type="password" placeholder="password" class="input input-bordered" />
              <label class="label">
                <a href="/" class="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div class="mt-6 form-control">
              <button type="submit" class="btn btn-primary">Signin</button>
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
