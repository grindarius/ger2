import { relations } from 'drizzle-orm'
import { integer, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { majorSubjects } from './major-subjects.js'

/**
 * Stores primitive information about a subject.
 * More information will be stored inside the opening subjects.
 */
export const subjects = pgTable('subjects', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  name: varchar('name', { length: 512 }).notNull(),
  description: text('description').notNull(),
  credit: integer('credit').notNull(),
  ...TIMESTAMP_COLUMNS
})

export const subjectsRelations = relations(subjects, ({ many }) => ({
  majorSubjects: many(majorSubjects)
}))
