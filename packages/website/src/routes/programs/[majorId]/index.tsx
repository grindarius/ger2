import { component$ } from '@builder.io/qwik'
import { useLocation } from '@builder.io/qwik-city'

export default component$(() => {
  const location = useLocation()

  return (
    <main class="container w-full mx-auto bg-base-100 pt-4">
      Major ID {location.params.majorId}
    </main>
  )
})
