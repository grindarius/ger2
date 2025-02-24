import { useSignal } from '@preact/signals'
import Counter from '../islands/Counter.tsx'

export default function Home() {
  const count = useSignal(3)

  return (
    <div class="py-8 px-4 mx-auto bg-[#86efac]">
      <div class="flex flex-col justify-center items-center mx-auto max-w-screen-md">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">Welcome to Fresh</h1>
        <p class="my-4">
          Try updating this message in the
          <code class="mx-2">./routes/index.tsx</code> file, and refresh.
        </p>
        <Counter count={count} />
      </div>
    </div>
  )
}
