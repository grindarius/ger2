import { component$ } from '@builder.io/qwik'
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city'
import ky from 'ky'
import { MajorSubjectsTree } from '~/components/major-information-tree/major-information-tree'
import type { GetProgramResponseBody } from '~/types/server/GetProgramResponseBody'
import type { GetProgramSubjectsResponseBody } from '~/types/server/GetProgramSubjectsResponseBody'

export const useGetProgram = routeLoader$(async ({ env, params }) => {
  const response = await ky
    .get(`${env.get('FULL_API_LINK') ?? ''}/programs/${params.majorId}`)
    .json<GetProgramResponseBody>()
  return response
})

export const useGetProgramSubjects = routeLoader$(async ({ env, params }) => {
  const response = await ky
    .get(`${env.get('FULL_API_LINK') ?? ''}/programs/${params.majorId}/subjects`)
    .json<GetProgramSubjectsResponseBody>()
  return response
})

export default component$(() => {
  const program = useGetProgram()
  const subjects = useGetProgramSubjects()

  return (
    <main class="container px-4 pt-4 mx-auto w-full lg:px-0">
      <section>
        <h1 class="mb-6 text-2xl font-bold">{program.value.name}</h1>
        <div
          class="grid gap-x-2"
          style="grid-template-columns: fit-content(12rem) fit-content(12rem)"
        >
          <h3 class="font-bold text-md">Curriculum name:</h3>
          <p class="text-md">{program.value.curriculum_name}</p>
        </div>
      </section>

      <section>
        <MajorSubjectsTree nodes={subjects} />
      </section>
    </main>
  )
})

export const head: DocumentHead = ({ resolveValue }) => {
  const program = resolveValue(useGetProgram)

  return {
    title: `${program.name} ● ger2`
  }
}
