import { component$, Slot } from '@builder.io/qwik'
import type { RequestHandler } from '@builder.io/qwik-city'

import { RadixIconsListBullet } from '~/components/icons/radix-icons/list-bullet'
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
      <main class="min-h-screen drawer-content">
        <Navbar />
        <Slot />
        <label for="main-drawer" class="fixed right-4 bottom-4 rounded-full lg:right-20 lg:bottom-20 btn btn-primary drawer-button">
          <RadixIconsListBullet />
        </label>
      </main>
      <aside class="drawer-side">
        <label for="main-drawer" class="drawer-overlay" />
        <ul class="p-4 w-80 h-full menu bg-base-200 text-base-content">
          <li>
            <a href="/programs">
              Programs
            </a>
          </li>
          <li>
            <a href="#">
              Sidebar 2
            </a>
          </li>
        </ul>
      </aside>
    </div>
  )
})
