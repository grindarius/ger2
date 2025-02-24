import { component$ } from '@builder.io/qwik'

export const Post = component$(() => {
  return (
    <div class="order-primary">
      {/* Username section with community comment */}
      <div class="flex flex-row justify-between">
        <div class="font-bold text-primary">Shop announcements</div>
        <div class="font-bold text-primary">grindarius</div>
      </div>

      <h2 class="text-2xl">🔒 Welcome to our community</h2>
      <p class="text-md line-clamp-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias labore veritatis harum.
        Ea itaque quod doloribus praesentium neque iste adipisci nemo veniam unde quae alias, dolore
        voluptatem dolorem laudantium quam vitae cupiditate velit. Quos amet fuga, natus
        perspiciatis beatae eius! Repellendus et, voluptates blanditiis soluta rem consequuntur
        explicabo repudiandae facilis.
      </p>

      {/* reacions and views section */}
      <div class="flex flex-row justify-between">
        <div class="flex gap-x-4">
          <div>13k views</div>
          <div>122 replies</div>
        </div>
        <div class="flex gap-x-4">
          <div>👍 22</div>
          <div>👎 33</div>
          <div>💖 108</div>
        </div>
      </div>
    </div>
  )
})
