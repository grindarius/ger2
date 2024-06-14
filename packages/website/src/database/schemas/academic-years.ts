import { relations, sql } from 'drizzle-orm'
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from './helpers'
import { majors } from './majors'
import { openingSubjectEligibleMajors } from './opening-subject-eligible-majors'
import { semesters } from './semesters'
import { students } from './students'

export const academicYears = pgTable('academic_years', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  year: integer('year').notNull().unique().default(sql`cast(date_part('year', now()) as int)`),
  ...TIMESTAMP_COLUMNS
})

export const academicYearsRelations = relations(academicYears, ({ many }) => ({
  semesters: many(semesters),
  majors: many(majors),
  students: many(students),
  eligibleMajors: many(openingSubjectEligibleMajors)
}))
