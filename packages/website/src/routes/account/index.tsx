import { component$ } from '@builder.io/qwik'

export default component$(() => {
  return (
    <main class="container px-4 pt-4 mx-auto w-full lg:px-0 bg-base-100">
      <section class="flex flex-col items-center space-y-3">
        <img
          class="rounded-full"
          src="https://loremflickr.com/240/240"
          width="240"
          height="240"
          alt="profile"
        />
        <h3 class="text-2xl">full name aka username</h3>
      </section>
    </main>
  )
})
