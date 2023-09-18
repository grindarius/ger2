import groupBy from 'just-group-by'
import ky from 'ky'

import { component$, useComputed$ } from '@builder.io/qwik'
import { type DocumentHead, routeLoader$ } from '@builder.io/qwik-city'

import { type GetCurriculumsResponseBody } from '~/types/server/GetCurriculumsResponseBody'

export const useGetCurriculums = routeLoader$(async ({ env }) => {
  const response = await ky.get(`${env.get('FULL_API_LINK') ?? ''}/curriculums`).json<GetCurriculumsResponseBody>()
  return response
})

export default component$(() => {
  const response = useGetCurriculums()

  const faculties = useComputed$(() => {
    return groupBy(response.value, r => r.faculty_id)
  })

  return (
    <main class="container w-full mx-auto bg-base-100 pt-4">

      {
        Object.entries(faculties.value).map(f => {
          return (
            <>
              <h1 class="text-3xl font-bold">{f[1][0].faculty_name}</h1>
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
                            <td colSpan={6}>{c[1][0].curriculum_name}</td>
                          </tr>
                          {
                            c[1].map((m, i) => {
                              return (
                                <tr key={m.major_id}>
                                  <th>{i + 1}</th>
                                  <td>{m.major_name}</td>
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
