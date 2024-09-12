import type { QwikIntrinsicElements } from '@builder.io/qwik'

export const RadixIconsHamburgerMenu = (props: QwikIntrinsicElements['svg'], key: string) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 15 15"
      {...props}
      key={key}
    >
      <title>Radix Icons - Hamburger Menu</title>
      <path
        fill="currentColor"
        fill-rule="evenodd"
        d="M1.5 3a.5.5 0 0 0 0 1h12a.5.5 0 0 0 0-1zM1 7.5a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 0 1h-12a.5.5 0 0 1-.5-.5"
        clip-rule="evenodd"
      />
    </svg>
  )
}