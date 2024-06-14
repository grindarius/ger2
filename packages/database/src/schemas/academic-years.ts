import { relations, sql } from 'drizzle-orm'
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { majors } from './majors.js'
import { openingSubjectEligibleMajors } from './opening-subject-eligible-majors.js'
import { semesters } from './semesters.js'
import { students } from './students.js'

export const academicYears = pgTable('academic_years', {
  id: varchar('id', { length: 32 }).notNull().primaryKey(),
  year: integer('year').notNull().unique().default(sql`cast(date_part('year', now()) as int)`),
  ...TIMESTAMP_COLUMNS
})

export const academicYearsRelations = relations(academicYears, ({ many }) => ({
  semesters: many(semesters),
  majors: many(majors),
  students: many(students),
  openingSubjectEligibleMajors: many(openingSubjectEligibleMajors)
}))
