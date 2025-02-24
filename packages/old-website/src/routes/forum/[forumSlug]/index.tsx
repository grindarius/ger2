import { component$ } from '@builder.io/qwik'
import { useLocation } from '@builder.io/qwik-city'

export default component$(() => {
  const loc = useLocation()

  return (
    <div>
      First page of a forum or a group. You can create a forum from the first page and here you can
      browse posts inside the forum. forum_id: {loc.params.forumSlug}
    </div>
  )
})
