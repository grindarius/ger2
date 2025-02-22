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
      <div class="navbar bg-base-100">
        <div class="flex-1">
          <a href="/" class="text-xl btn btn-ghost">daisyUI</a>
        </div>
        <div class="flex-none gap-2">
          <div class="form-control">
            <input type="text" placeholder="Search" class="w-24 md:w-auto input input-bordered" />
          </div>
          <div class="dropdown dropdown-end">
            <button type="button" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </button>
            <ul
              tabIndex={0}
              class="p-2 mt-3 w-52 shadow menu menu-sm dropdown-content bg-base-100 rounded-box z-[1]"
            >
              <li>
                <a href="/profile" class="justify-between">
                  Profile
                  <span class="badge">New</span>
                </a>
              </li>
              <li>
                <a href="/profile/settings">Settings</a>
              </li>
              <li>
                <a href="/signout">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <input id="drawer-toggler" type="checkbox" class="drawer-toggle" />
      <main class="min-h-screen drawer-content bg-base-100">
        <Slot />
        <label
          for="drawer-toggler"
          class="fixed right-6 bottom-6 rounded-full lg:right-20 lg:bottom-20 btn btn-primary drawer-button"
        >
          <RadixIconsHamburgerMenu key="drawer-toggle-icon" />
        </label>
      </main>

      <aside class="drawer-side">
        <label for="drawer-toggler" aria-label="close sidebar" class="drawer-overlay" />
        <ul class="p-4 w-80 min-h-full menu bg-base-200 text-base-content">
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
