import { sql } from 'drizzle-orm'
import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const userNames = pgTable('user_names', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  userId: varchar('user_id', { length: 26 }).notNull(),
  language: varchar('language', { length: 2 }).notNull(),
  firstName: text('first_name').notNull(),
  middleName: text('middle_name').notNull().default(''),
  lastName: text('last_name').notNull().default(''),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => sql`now()`)
})
