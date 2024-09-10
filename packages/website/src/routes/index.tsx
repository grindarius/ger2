import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'

export default component$(() => {
  return <main class="text-white">
    lesgoooo
  </main>
})

export const head: DocumentHead = {
  title: 'ger2',
  meta: [
    {
      name: 'description',
      content: 'Study site redefined.'
    }
  ]
}
