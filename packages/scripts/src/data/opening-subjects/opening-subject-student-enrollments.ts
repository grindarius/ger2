import { faker } from '@faker-js/faker'
import { ulid } from 'ulid'
import {
  NewOpeningSubjectStudentEnrollments,
  NewOpeningSubjects,
  NewStudents,
} from '../../types/index.js'

export const generateOpeningSubjectsStudentEnrollments = (
  openingSubjects: Array<NewOpeningSubjects>,
  students: Array<NewStudents>
): Array<NewOpeningSubjectStudentEnrollments> => {
  return openingSubjects.flatMap(os => {
    return faker.helpers.arrayElements(students, { min: 40, max: 60 }).map(s => {
      return {
        id: ulid(),
        opening_subject_id: os.id,
        student_id: s.account_id,
        class_comment: '',
      }
    })
  })
}
