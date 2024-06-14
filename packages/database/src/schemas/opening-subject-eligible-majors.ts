import { relations } from 'drizzle-orm'
import { pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core'
import { academicYears } from './academic-years.js'
import { majors } from './majors.js'
import { openingSubjects } from './opening-subjects.js'

export const openingSubjectEligibleMajors = pgTable(
  'opening_subject_eligible_majors',
  {
    openingSubjectId: varchar('opening_subject_id', { length: 32 })
      .notNull()
      .references(() => openingSubjects.id),
    majorId: varchar('major_id', { length: 32 })
      .notNull()
      .references(() => majors.id),
    academicYearId: varchar('academic_year_id', { length: 32 })
      .notNull()
      .references(() => academicYears.id)
  },
  t => ({
    pk: primaryKey({ columns: [t.openingSubjectId, t.majorId, t.academicYearId] })
  })
)

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
