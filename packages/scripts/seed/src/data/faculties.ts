import type { faculties } from '@ger2/database'
import type { InferInsertModel } from 'drizzle-orm'

export const seedFaculties: Array<InferInsertModel<typeof faculties>> = [
  {
    id: '00000001Z23ETSV18GMGPB3N4T',
    name: 'Faculty of Science',
    createdAt: '2018-01-12T04:04:34.048+0700',
    updatedAt: '2018-01-12T04:04:34.048+0700'
  }
]
