import dayjs from 'dayjs'

import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

import { useAuthSession } from './plugin@auth'

export default component$(() => {
  const session = useAuthSession()

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
