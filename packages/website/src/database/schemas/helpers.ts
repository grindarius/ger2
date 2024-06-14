import { sql } from 'drizzle-orm'
import { timestamp } from 'drizzle-orm/pg-core'

export const TIMESTAMP_COLUMNS = {
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => sql`now()`)
} as const
