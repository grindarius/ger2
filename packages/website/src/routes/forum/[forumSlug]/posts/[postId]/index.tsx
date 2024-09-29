import { component$ } from '@builder.io/qwik'

export default component$(() => {
  return (
    <div>
      The forum posts with infinite scroll loading, posts ordered by time, can be replies of another
      posts, when clicked on a reply, will redirect back to the first post.

      Can also be redirected to the post with a comment id.
    </div>
  )
})
