import { relations } from 'drizzle-orm'
import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { majors } from './majors.js'

/**
 * Stores information about different educational qualifications a faculty can have.
 * e.g. `Bachelor regular 2 semesters`, `Bachelor regular 2 semesters, weekends.`.
 */
export const programs = pgTable('educational_qualifications', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  name: varchar('name', { length: 256 }).notNull().unique(),
  ...TIMESTAMP_COLUMNS
})

export const programsRelations = relations(programs, ({ many }) => ({
  majors: many(majors)
}))
