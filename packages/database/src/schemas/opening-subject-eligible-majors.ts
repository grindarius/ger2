import { relations } from 'drizzle-orm'
import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { academicYears } from './academic-years.js'
import { majors } from './majors.js'
import { openingSubjects } from './opening-subjects.js'

/**
 * List of `majorId` and `academicYearId` that tells if a student can take a subject
 * in this opening subject.
 */
export const openingSubjectEligibleMajors = pgTable('opening_subject_eligible_majors', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  openingSubjectId: varchar('opening_subject_id', { length: 26 })
    .notNull()
    .references(() => openingSubjects.id),
  majorId: varchar('major_id', { length: 26 })
    .notNull()
    .references(() => majors.id),
  academicYearId: varchar('academic_year_id', { length: 26 })
    .notNull()
    .references(() => academicYears.id)
})

export const openingSubjectEligibleMajorsRelations = relations(
  openingSubjectEligibleMajors,
  ({ one }) => ({
    openingSubject: one(openingSubjects, {
      fields: [openingSubjectEligibleMajors.openingSubjectId],
      references: [openingSubjects.id]
    }),
    major: one(majors, {
      fields: [openingSubjectEligibleMajors.majorId],
      references: [majors.id]
    }),
    academicYear: one(academicYears, {
      fields: [openingSubjectEligibleMajors.academicYearId],
      references: [academicYears.id]
    })
  })
)
