import { component$, type Signal, useComputed$ } from '@builder.io/qwik'

import { type GetProgramSubjectsResponseBody } from '~/types/server/GetProgramSubjectsResponseBody'
import { type GetProgramSubjectsResponseBodyTree } from '~/types/server/GetProgramSubjectsResponseBodyTree'

export interface TreeNodeProps {
  node: GetProgramSubjectsResponseBodyTree
  data: GetProgramSubjectsResponseBody
}

export const TreeNode = component$<TreeNodeProps>(({ node, data }) => {
  const children = useComputed$(() => {
    return data.tree.filter(d => d.parent_id === node.id)
  })

  return (
    <div>
      {node.name}
      <br />
      {data.subjects.filter(d => d.major_subject_group_id === node.id).map(d => d.name).join(', ')}
      {children.value.map(c => <TreeNode key={c.id} node={c} data={data} />)}
    </div>
  )
})

export interface TreeProps {
  nodes: Readonly<Signal<GetProgramSubjectsResponseBody>>
}

export const Tree = component$<TreeProps>(({ nodes }) => {
  const rootNodes = useComputed$(() => {
    return nodes.value.tree.filter(n => n.parent_id == null)
  })

  return (
    <div>
      {rootNodes.value.map(r => <TreeNode key={r.id} node={r} data={nodes.value} />)}
    </div>
  )
})
