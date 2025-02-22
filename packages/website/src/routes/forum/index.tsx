import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { Post } from '~/components/forum/post'

export const head: DocumentHead = {
  title: 'Forum • ger2'
}

export default component$(() => {
  return (
    <>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div class="col-span-2 col-start-2">
          <Post />
          <Post />
          <Post />
        </div>
        <div class="hidden col-start-4 md:block">trending sidebar</div>
      </div>
    </>
  )
})
