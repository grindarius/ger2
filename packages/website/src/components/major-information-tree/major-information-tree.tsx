import { component$, type Signal, useComputed$ } from '@builder.io/qwik'

import { type GetProgramSubjectsResponseBody } from '~/types/server/GetProgramSubjectsResponseBody'
import { type GetProgramSubjectsResponseBodyTree } from '~/types/server/GetProgramSubjectsResponseBodyTree'

export interface TreeNodeProps {
  node: GetProgramSubjectsResponseBodyTree
  data: GetProgramSubjectsResponseBody
}

export const MajorSubjectsTreeNode = component$<TreeNodeProps>(({ node, data }) => {
  const children = useComputed$(() => {
    return data.tree.filter(d => d.parent_id === node.id)
  })

  const subjects = useComputed$(() => {
    return data.subjects.filter(d => d.major_subject_group_id === node.id)
  })

  if (subjects.value.length === 0) {
    return (
      <div>
        <h3>{node.name}</h3>
        {children.value.map(c => <MajorSubjectsTreeNode key={c.id} node={c} data={data} />)}
      </div>
    )
  }

  return (
    <div>
      <h3 class="mb-4">{node.name}</h3>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>Subject ID</th>
              <th>Name</th>
              <th>Credit</th>
            </tr>
          </thead>
          <tbody>
            {data.subjects.filter(d => d.major_subject_group_id === node.id).map(d => {
              return (
                <tr key="d.id">
                  <td class="w-1/3">{d.id}</td>
                  <td class="w-1/3">{d.name}</td>
                  <td class="w-1/3">{d.credit}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {children.value.map(c => <MajorSubjectsTreeNode key={c.id} node={c} data={data} />)}
    </div>
  )
})

export interface MajorSubjectsTreeProps {
  nodes: Readonly<Signal<GetProgramSubjectsResponseBody>>
}

export const MajorSubjectsTree = component$<MajorSubjectsTreeProps>(({ nodes }) => {
  const rootNodes = useComputed$(() => {
    return nodes.value.tree.filter(n => n.parent_id == null)
  })

  return (
    <div>
      {rootNodes.value.map(r => <MajorSubjectsTreeNode key={r.id} node={r} data={nodes.value} />)}
    </div>
  )
})
