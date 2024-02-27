import { faker } from '@faker-js/faker'
import { ulid } from 'ulidx'
import {
  NewOpeningSubjectAdditionalEligibleStudents,
  NewStudents,
  OpeningSubjects
} from '../../types/index.js'

export const generateOpeningSubjectAdditionalEligibleStudents = (
  students: Array<NewStudents>,
  openingSubjects: Array<OpeningSubjects>
): Array<NewOpeningSubjectAdditionalEligibleStudents> => {
  return openingSubjects.flatMap(os => {
    return faker.helpers.arrayElements(students, { min: 0, max: 2 }).map(s => {
      return {
        id: ulid(),
        opening_subject_id: os.id,
        student_id: s.account_id
      }
    })
  })
}
