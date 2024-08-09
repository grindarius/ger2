import type { degrees } from '@ger2/database'
import type { InferInsertModel } from 'drizzle-orm'

export const seedDegrees: Array<InferInsertModel<typeof degrees>> = [
  {
    id: '00000001Z2NHQJ5TEVGR0QG85Z',
    name: 'Bachelor of Computer Science',
    createdAt: '2018-01-18T12:18:19.048+0700',
    updatedAt: '2018-01-18T12:18:19.048+0700'
  },
  {
    id: '00000001Z2YSBGQ5KQTE353E1X',
    name: 'Master of Computer Science',
    createdAt: '2018-01-18T12:18:19.048+0700',
    updatedAt: '2018-01-18T12:18:19.048+0700'
  }
]
