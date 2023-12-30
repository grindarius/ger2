import { faker } from '@faker-js/faker'
import { sql } from 'kysely'
import { ulid } from 'ulid'
import { k } from '../../postgres/index.js'
import { NewOpeningSubjects, NewSemesterTerms } from '../../types/index.js'

export const generateOpeningSubjects = async (
  semesterTerms: Array<NewSemesterTerms>,
): Promise<Array<NewOpeningSubjects>> => {
  const openingSubjects: Array<NewOpeningSubjects> = []

  // to create opening subjects in each major id
  // You will need
  // - list of major_id (to find semester_term_id)
  // - list of studyable subject ids from the major that a student studies

  const studentsMajorIdList = await sql<{
    major_id: string
  }>`select distinct(students.major_id) as major_id, array_agg(semester_terms.id) as semester_terms from students`.execute(
    k,
  )

  for (const term of semesterTerms) {
    for (const majorId of studentsMajorIdList.rows) {
      const studyableSubjects = await sql<{ id: string }>`
        select
          subjects.id as id
        from major_subject_groups
        inner join major_subjects on major_subject_groups.id = major_subjects.major_subject_groups.id
        where major_subject_groups = ${sql.lit(majorId.major_id)}`.execute(k)

      openingSubjects.push({
        id: ulid(),
        semester_term_id: term.id,
        subject_id: faker.helpers.arrayElement(studyableSubjects.rows).id,
        subject_capacity: 1000,
        grading_criteria: '{"A":80,"B+":75,"B":70,"C+":65,"C":60,"D+":55,"D":50,"F":40}',
      })
    }
  }

  return openingSubjects
}
