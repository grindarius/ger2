import { type JSXNode, type QwikIntrinsicElements } from '@builder.io/qwik'

export const RadixIconsListBullet = (props: QwikIntrinsicElements['svg'], key: string): JSXNode => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 15 15" {...props} key={key}>
      <path fill="currentColor" fillRule="evenodd" d="M1.5 5.25a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5ZM4 4.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5ZM4.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9Zm0 3a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9ZM2.25 7.5a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0Zm-.75 3.75a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
    </svg>
  )
}
