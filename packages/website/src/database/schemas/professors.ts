import { relations, sql } from 'drizzle-orm'
import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { openingSubjects } from './opening-subjects'
import { students } from './students'
import { users } from './users'

export const professors = pgTable('professors', {
  userId: varchar('user_id', { length: 26 })
    .notNull()
    .primaryKey()
    .references(() => users.id),
  description: text('description').notNull().default(''),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => sql`now()`)
})

export const professorsRelations = relations(professors, ({ many }) => ({
  students: many(students),
  openingSubjects: many(openingSubjects)
}))
