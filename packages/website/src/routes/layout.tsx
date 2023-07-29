import { ListUnorderedIcon } from 'primer-octicons-qwik'

import { component$, Slot } from '@builder.io/qwik'
import type { RequestHandler } from '@builder.io/qwik-city'

import { Navbar } from '~/components/navbar/navbar'

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5
  })
}

export default component$(() => {
  return (
    <div class="drawer">
      <input id="main-drawer" type="checkbox" class="drawer-toggle" />
      <main class="drawer-content min-h-screen">
        <Navbar />
        <Slot />
        <label for="main-drawer" class="btn btn-primary drawer-button rounded-full absolute bottom-4 right-4">
          <ListUnorderedIcon size={16} />
        </label>
      </main>
      <aside class="drawer-side">
        <label for="main-drawer" class="drawer-overlay" />
        <ul class="menu p-4 w-80 h-full bg-base-200 text-base-content">
          <li><a href="">Sidebar 1</a></li>
          <li><a href="">Sidebar 2</a></li>
        </ul>
      </aside>
    </div>
  )
})
