import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'
import { ulid } from 'ulid'
import {
  NewOpeningSubjectAssignments,
  NewOpeningSubjectStudentEnrollments,
  OpeningSubjectStudentAssignments
} from '../../types/index.js'

export const generateOpeningSubjectStudentAssignments = (
  openingSubjectAssignments: Array<NewOpeningSubjectAssignments>,
  openingSubjectStudentEnrollments: Array<NewOpeningSubjectStudentEnrollments>
): Array<OpeningSubjectStudentAssignments> => {
  return openingSubjectAssignments.map(osa => {
    return {
      id: ulid(),
      opening_subject_student_enrollment_id: faker.helpers.arrayElement(
        openingSubjectStudentEnrollments
      ).id,
      opening_subject_assignment_id: osa.id,
      score: faker.number.int({ min: 10 }),
      created_at: dayjs().toISOString(),
      updated_at: dayjs().toISOString()
    }
  })
}
