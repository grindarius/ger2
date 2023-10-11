import groupBy from 'just-group-by'
import ky from 'ky'

import { component$, useComputed$ } from '@builder.io/qwik'
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city'

import { type GetProgramsResponseBody } from '~/types/server/GetProgramsResponseBody'

export const useGetPrograms = routeLoader$(async ({ env }) => {
  const response = await ky.get(`${env.get('FULL_API_LINK') ?? ''}/programs`).json<GetProgramsResponseBody>()
  return response
})

export default component$(() => {
  const response = useGetPrograms()

  const faculties = useComputed$(() => {
    return groupBy(response.value, r => r.faculty_id)
  })

  return (
    <main class="container pt-4 mx-auto w-full bg-base-100">

      {
        Object.entries(faculties.value).map(f => {
          return (
            <>
              <h1 class="mt-8 mb-6 text-3xl font-bold">{f[1][0].faculty_name}</h1>
              <div class="overflow-x-auto">
                <table class="table w-full">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Year</th>
                      <th>Credit</th>
                      <th>Year to study</th>
                      <th>Minimum GPA</th>
                    </tr>
                  </thead>

                  {
                    Object.entries(groupBy(f[1], f => f.curriculum_id)).map(c => {
                      return (
                        <tbody key={c[0]}>
                          <tr>
                            <td colSpan={6}>
                              <h4 class="text-xl font-bold">
                                {c[1][0].curriculum_name}
                              </h4>
                            </td>
                          </tr>

                          {
                            c[1].map((m, i) => {
                              return (
                                <tr key={m.major_id}>
                                  <th>{i + 1}</th>
                                  <td>
                                    <a href={`/programs/${m.major_id}`} class="link">
                                      {m.major_name}
                                    </a>
                                  </td>
                                  <td>{m.year}</td>
                                  <td>{m.minimum_credit}</td>
                                  <td>{m.year_amount}</td>
                                  <td>{m.minimum_gpa}</td>
                                </tr>
                              )
                            })
                          }

                        </tbody>
                      )
                    })
                  }

                </table>
              </div>
            </>
          )
        })
      }

    </main>
  )
})

export const head: DocumentHead = {
  title: 'Curriculums ● ger2'
}
