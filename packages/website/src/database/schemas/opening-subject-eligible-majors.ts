import { relations } from 'drizzle-orm'
import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { academicYears } from './academic-years'
import { majors } from './majors'
import { openingSubjects } from './opening-subjects'

export const openingSubjectEligibleMajors = pgTable('opening_subject_eligible_majors', {
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
