import { relations } from 'drizzle-orm'
import { index, integer, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { majorSubjects } from './major-subjects.js'
import { openingSubjects } from './opening-subjects.js'

/**
 * Stores primitive information about a subject.
 * More information will be stored inside the opening subjects.
 */
export const subjects = pgTable(
  'subjects',
  {
    id: varchar('id', { length: 26 }).notNull().primaryKey(),

    /**
     * Simple subject id, same as student id.
     */
    subjectId: varchar('subject_id', { length: 32 }).notNull().unique(),
    name: varchar('name', { length: 512 }).notNull().unique(),
    description: text('description').notNull(),
    credit: integer('credit').notNull(),
    ...TIMESTAMP_COLUMNS
  },
  t => [index('pgroonga_subject_name_index').using('pgroonga', t.name)]
)

export const subjectsRelations = relations(subjects, ({ many }) => ({
  majorSubjects: many(majorSubjects),
  openingSubjects: many(openingSubjects)
}))
