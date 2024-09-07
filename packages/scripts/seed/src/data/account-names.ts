import type { accountNames } from '@ger2/database'
import type { InferInsertModel } from 'drizzle-orm'

export const seedAccountNames: Array<InferInsertModel<typeof accountNames>> = []
