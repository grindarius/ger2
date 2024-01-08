import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'
import { ulid } from 'ulid'
import {
  NewOpeningSubjectAssignments,
  NewOpeningSubjects,
  NewProfessors
} from '../../types/index.js'

export const generateOpeningSubjectAssignments = (
  openingSubjects: Array<NewOpeningSubjects>,
  professors: Array<NewProfessors>
): Array<NewOpeningSubjectAssignments> => {
  return openingSubjects.flatMap(os => {
    return {
      id: ulid(),
      opening_subject_id: os.id,
      professor_id: faker.helpers.arrayElement(professors).account_id,
      name: faker.commerce.productName(),
      full_score: faker.number.int({ min: 30, max: 100 }),
      created_at: dayjs().toISOString()
    }
  })
}
