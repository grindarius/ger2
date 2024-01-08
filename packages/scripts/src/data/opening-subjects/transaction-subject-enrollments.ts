import { faker } from '@faker-js/faker'
import {
  NewOpeningSubjectStudentEnrollments,
  NewTransactionSubjectEnrollments,
  NewTransactions,
} from '../../types/index.js'

export const generateTransactionSubjectEnrollments = (
  transactions: Array<NewTransactions>,
  openingSubjectStudentEnrollments: Array<NewOpeningSubjectStudentEnrollments>
): Array<NewTransactionSubjectEnrollments> => {
  return transactions.flatMap(t => {
    return Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => {
      return {
        opening_subject_student_enrollment_id: faker.helpers.arrayElement(
          openingSubjectStudentEnrollments
        ).id,
        transaction_id: t.id,
      }
    })
  })
}
