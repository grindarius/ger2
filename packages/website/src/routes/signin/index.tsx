import { component$, useComputed$, useStore, useVisibleTask$ } from '@builder.io/qwik'
import { type DocumentHead, Form, routeAction$, z, zod$ } from '@builder.io/qwik-city'
import { ulid } from 'ulidx'
import { k, lucia } from '~/routes/plugin@lucia'
import { argon2 } from '../plugin@oslo'

export const useSigninAction = routeAction$(
  async (values, ev) => {
    const existingUser = await k
      .selectFrom('users')
      .select(['id', 'role', 'username', 'password'])
      .where(({ eb, or }) => {
        return or([
          eb('username', '=', values.username),
          eb(eb.fn('lower', ['email']), '=', values.username)
        ])
      })
      .executeTakeFirst()

    if (existingUser == null) {
      return ev.fail(400, {
        message: `User with username of '${values.username}' cannot be found`
      })
    }

    const isPasswordValid = await argon2.verify(existingUser.password, values.password)
    if (!isPasswordValid) {
      return ev.fail(400, { message: 'Incorrect username or password' })
    }

    const session = await lucia.createSession(existingUser.id, {}, { sessionId: ulid() })
    ev.headers.set('Set-Cookie', lucia.createSessionCookie(session.id).serialize())
    throw ev.redirect(303, '/')
  },
  zod$({
    username: z.string().min(3).max(48),
    password: z.string().min(8).max(64)
  })
)

export default component$(() => {
  const signinAction = useSigninAction()

  const formFieldsErrors = useStore({
    username: false,
    password: false
  })

  return (
    <main class="min-h-screen hero bg-base-200">
      <div class="flex-col lg:flex-row-reverse hero-content">
        <div class="flex-shrink-0 w-full lg:w-96 shadow-2xl card bg-base-100">
          <Form
            action={signinAction}
            onSubmitCompleted$={w => {
              if (w.detail.value.failed)
            }}
            class="card-body"
          >
            <div class="form-control">
              <label class="label">
                <span class="label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="username"
                class={usernameStyles.value}
                onClick$={() => {
                  signinAction.submit()
                }}
              />
              <label class="label">
                <span class="label-text-alt text-error">{usernameFieldError.value.toString()}</span>
              </label>
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                autoComplete="current-password"
                class="input input-bordered"
                onClick$={() => {
                  formFieldsErrors.password = false
                }}
              />
              <label class="label">
                <span class="label-text-alt text-error">woh {failed.value.toString()}</span>
              </label>
            </div>
            <div class="mt-6 form-control">
              <button type="submit" class="btn btn-primary">
                Signin
              </button>
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
