import type { programs } from '@ger2/database'
import type { InferInsertModel } from 'drizzle-orm'

export const seedPrograms: Array<InferInsertModel<typeof programs>> = [
  {
    id: '00000001Z2QN95R6S1RTD65E7Q',
    name: 'Bachelor 2 semesters (normal)',
    createdAt: '2018-01-21T21:04:50.034+0700',
    updatedAt: '2018-01-21T21:04:50.034+0700'
  },
  {
    id: '00000001Z2GZYHT7CSEK7YB4WJ',
    name: 'Master 2 semesters (normal)',
    createdAt: '2018-01-21T21:04:50.034+0700',
    updatedAt: '2018-01-21T21:04:50.034+0700'
  },
  {
    id: '00000001Z2C7Z25G3MPTEAZPGK',
    name: 'Doctor of Philosophy 2 semesters (normal)',
    createdAt: '2018-01-21T21:04:50.034+0700',
    updatedAt: '2018-01-21T21:04:50.034+0700'
  }
]
