import { IS_BROWSER } from '$fresh/runtime.ts'
import type { JSX } from 'preact'

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class="py-1 px-2 bg-white rounded border-2 border-gray-500 transition-colors hover:bg-gray-200"
    />
  )
}
