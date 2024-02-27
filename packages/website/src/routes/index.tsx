import dayjs from 'dayjs'

import { component$ } from '@builder.io/qwik'
import { routeLoader$, type DocumentHead } from '@builder.io/qwik-city'
import { lucia } from '~/routes/plugin@lucia'

export const useSessionLoader = routeLoader$(async (event) => {
  const authRequest = lucia.handleRequest(event)
  const session = await authRequest.validate()

  return session ?? null
})

export default component$(() => {
  const session = useSessionLoader()

  return (
    <>
      <h1>who dis</h1>
      <h1>Session: {JSON.stringify(session.value)}</h1>
      <h1>Expires: {dayjs(session.value?.expires).format()}</h1>
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
