import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

export default component$(() => {
  return (
    <>
      <h1>who dis</h1>
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
