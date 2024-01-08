import { faker } from '@faker-js/faker'
import flatten from 'just-flatten-it'
import { sql } from 'kysely'
import { k } from '../postgres/index.js'
import { type NewMajorSubjects, type NewMajors, type NewSubjects } from '../types/index.js'

export const generateMajorSubjects = async (
  majors: Array<NewMajors>,
  subjects: Array<NewSubjects>
): Promise<Array<NewMajorSubjects>> => {
  const majorSubjects = await Promise.all(
    majors.map(async major => {
      const majorSubjectGroups = await sql<{
        id: string
        major_id: string
        parent_id: string | null
        name: string
        minimum_credit: number
      }>`
      with recursive subject_leaves as (
        select
          m1.id,
          m1.major_id,
          m1.parent_id,
          m1.name,
          m1.minimum_credit
        from major_subject_groups m1
        where m1.major_id = ${major.id}

        union all
        select 
          m2.id,
          m2.major_id,
          m2.parent_id,
          m2.name,
          m2.minimum_credit
        from major_subject_groups m2
        join subject_leaves on m2.parent_id = subject_leaves.id
        where m2.parent_id is not null
      )
      select distinct id, major_id, parent_id, name, minimum_credit
      from subject_leaves
      where not exists (select 1 from major_subject_groups where major_subject_groups.parent_id = subject_leaves.id)
    `.execute(k)

      return majorSubjectGroups.rows.map(leaf => {
        return faker.helpers.arrayElements(subjects, 5).map(subject => {
          return {
            major_subject_group_id: leaf.id,
            subject_id: subject.id,
            credit: 3
          }
        })
      })
    })
  )

  return flatten(majorSubjects)
}
