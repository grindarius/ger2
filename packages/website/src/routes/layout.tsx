import { Slot, component$ } from '@builder.io/qwik'
import type { RequestHandler } from '@builder.io/qwik-city'
import { RadixIconsHamburgerMenu } from '../components/icons/radix-icons/hamburger-menu'

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
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
      <input id="drawer-toggler" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content bg-base-100 min-h-screen">
        <main class="min-h-screen drawer-content">
          <Slot />
          <label
            for="drawer-toggler"
            class="fixed right-6 bottom-6 rounded-full lg:right-20 lg:bottom-20 btn btn-primary drawer-button"
          >
            <RadixIconsHamburgerMenu key="drawer-toggle-icon" />
          </label>
        </main>
      </div>
      <aside class="drawer-side">
        <label for="drawer-toggler" aria-label="close sidebar" class="drawer-overlay" />
        <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <li>
            <a href="/projects">Projects</a>
          </li>
          <li>
            <a href="/users">Users</a>
          </li>
        </ul>
      </aside>
    </div>
  )
})
