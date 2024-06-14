import { relations } from 'drizzle-orm'
import { integer, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { majorSubjects } from './major-subjects.js'
import { openingSubjects } from './opening-subjects.js'

export const subjects = pgTable('subjects', {
  id: varchar('id', { length: 32 }).notNull().primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull().default(''),
  credit: integer('credit').notNull(),
  ...TIMESTAMP_COLUMNS
})

export const subjectsRelations = relations(subjects, ({ many }) => ({
  majorSubjectGroups: many(majorSubjects),
  openingSubjects: many(openingSubjects)
}))
