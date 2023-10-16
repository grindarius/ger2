import ky from 'ky'

import { component$ } from '@builder.io/qwik'
import { type DocumentHead, routeLoader$, useLocation } from '@builder.io/qwik-city'

import { type GetProgramResponseBody } from '~/types/server/GetProgramResponseBody'

export const useGetProgram = routeLoader$(async ({ env, params }) => {
  const response = await ky.get(`${env.get('FULL_API_LINK') ?? ''}/programs/${params.majorId}`).json<GetProgramResponseBody>()
  return response
})

export const useGetProgramSubjects = routeLoader$(async ({ env, params }) => {
  const response = await ky.get(`${env.get('FULL_API_LINK') ?? ''}`)
})

export default component$(() => {
  const location = useLocation()

  return (
    <main class="container pt-4 mx-auto w-full bg-base-100">
      Major ID {location.params.majorId}
    </main>
  )
})

export const head: DocumentHead = ({ resolveValue }) => {
  const program = resolveValue(useGetProgram)

  return {
    title: `${program.name} ● ger2`
  }
}
