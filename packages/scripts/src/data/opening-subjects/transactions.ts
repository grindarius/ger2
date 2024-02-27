import dayjs from 'dayjs'
import { ulid } from 'ulidx'
import { NewOpeningSubjectStudentEnrollments, NewTransactions } from '../../types/index.js'

export const generateTransactions = (
  openingSubjectStudentEnrollments: Array<NewOpeningSubjectStudentEnrollments>
): Array<NewTransactions> => {
  return openingSubjectStudentEnrollments.map(os => {
    return {
      id: ulid(),
      account_id: os.student_id,
      payment_method: 'visa',
      price: 19990,
      payment_status: 'completed',
      transaction_type: JSON.stringify({ type: 'enrollment' }),
      created_at: dayjs().toISOString()
    }
  })
}
