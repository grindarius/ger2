import type { majors } from '@ger2/database'
import type { InferInsertModel } from 'drizzle-orm'

export const seedMajors: Array<InferInsertModel<typeof majors>> = [
  {
    id: '00000001Z2YWDWX2H7R90SXS9T',
    facultyId: '00000001Z23ETSV18GMGPB3N4T',
    programId: '00000001Z2QN95R6S1RTD65E7Q',
    degreeId: '00000001Z2NHQJ5TEVGR0QG85Z',
    academicYearId: '00000001Z2QVZ4KJSWM09GWCQB',
    name: 'Bachelor of Computer Science',
    minimumGpa: '2.00',
    duration: '4 years',
    minimum_credit: 131,
    createdAt: '2018-01-18T12:18:19.048+0700',
    updatedAt: '2018-01-18T12:18:19.048+0700'
  }
]
