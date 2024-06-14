import { relations, sql } from 'drizzle-orm'
import { integer, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { majorSubjectGroups } from './major-subject-groups'

export const subjects = pgTable('subjects', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull().default(''),
  credit: integer('credit').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => sql`now()`)
})

export const subjectsRelations = relations(subjects, ({ many }) => ({
  majorSubjectGroups: many(majorSubjectGroups)
}))
