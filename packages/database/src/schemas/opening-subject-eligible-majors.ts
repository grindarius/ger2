import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { openingSubjects } from './opening-subjects.js'
import { relations } from 'drizzle-orm'
import { majors } from './majors.js'
import { academicYears } from './academic-years.js'

/**
 * List of `majorId` and `academicYearId` that tells if a student can take a subject
 * in this opening subject.
 */
export const openingSubjectEligibleMajors = pgTable('opening_subject_eligible_majors', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  openingSubjectId: varchar('opening_subject_id', { length: 26 }).notNull(),
  majorId: varchar('major_id', { length: 26 }).notNull(),
  academicYearId: varchar('academic_year_id', { length: 26 }).notNull()
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
