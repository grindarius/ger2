import { component$ } from '@builder.io/qwik'
import { useLocation } from '@builder.io/qwik-city'

export default component$(() => {
  const location = useLocation()

  return (
    <main class="container pt-4 mx-auto w-full bg-base-100">
      Major ID {location.params.majorId}
    </main>
  )
})
