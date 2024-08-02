import { relations, sql } from 'drizzle-orm'
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { majors } from './majors.js'
import { openingSubjectEligibleMajors } from './opening-subject-eligible-majors.js'
import { semesters } from './semesters.js'

/**
 * Stores information about the academic year that a semester is in.
 * One academic year can expand into another year. That's why we need this entry.
 */
export const academicYears = pgTable('academic_years', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  year: integer('year').notNull().unique().default(sql`cast(date_part('year', now()) as int)`),
  ...TIMESTAMP_COLUMNS
})

export const academicYearsRelations = relations(academicYears, ({ many }) => ({
  majors: many(majors),
  semesters: many(semesters),
  openingSubjectEligibleMajors: many(openingSubjectEligibleMajors)
}))
