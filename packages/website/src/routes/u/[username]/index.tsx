import { component$ } from '@builder.io/qwik'
import { useLocation } from '@builder.io/qwik-city'

export default component$(() => {
  const loc = useLocation()

  return (
    <div class="text-white">
      Shows student information and stuffs for other students, shows their interactions with the
      forum. Kinda like reddit. The student id is {loc.params.username}

      maybe we have a "?tab=main|interactions|forum"
    </div>
  )
})
