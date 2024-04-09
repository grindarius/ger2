import { component$ } from '@builder.io/qwik'
import { type DocumentHead, routeAction$, routeLoader$ } from '@builder.io/qwik-city'
import dayjs from 'dayjs'
import { getSession, lucia } from './plugin@lucia'

export const useSignoutAction = routeAction$(async (_data, event) => {
  const cookieValue = event.cookie.get(lucia.sessionCookieName)

  if (cookieValue?.value == null) {
    return event.fail(401, { message: 'unauthorized' })
  }

  const { user, session } = await lucia.validateSession(cookieValue?.value ?? '')
  if (user == null && session == null) {
    return event.fail(401, { message: 'unauthorized' })
  }

  await lucia.invalidateSession(session.id)
  event.headers.append('Set-Cookie', lucia.createBlankSessionCookie().serialize())
  throw event.redirect(303, '/')
})

export const useSessionLoader = routeLoader$(async event => {
  return await getSession(event)
})

export default component$(() => {
  const session = useSessionLoader()

  return (
    <>
      <h1>who dis</h1>
      <h1>Session: {JSON.stringify(session.value)}</h1>
      <h1>Expires: {dayjs(session.value?.session?.expiresAt).format()}</h1>
    </>
  )
})

export const head: DocumentHead = {
  title: 'ger2',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description'
    }
  ]
}
