import { relations } from 'drizzle-orm'
import { pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core'
import { openingSubjects } from './opening-subjects.js'
import { students } from './students.js'

export const openingSubjectAdditionalEligibleStudents = pgTable(
  'opening_subject_additional_eligible_students',
  {
    openingSubjectId: varchar('opening_subject_id', { length: 32 })
      .notNull()
      .references(() => openingSubjects.id),
    studentId: varchar('student_id', { length: 32 })
      .notNull()
      .references(() => students.userId)
  },
  t => ({
    pk: primaryKey({ columns: [t.openingSubjectId, t.studentId] })
  })
)

export const openingSubjectAdditionalEligibleStudentsRelations = relations(
  openingSubjectAdditionalEligibleStudents,
  ({ one }) => ({
    openingSubject: one(openingSubjects, {
      fields: [openingSubjectAdditionalEligibleStudents.openingSubjectId],
      references: [openingSubjects.id]
    }),
    student: one(students, {
      fields: [openingSubjectAdditionalEligibleStudents.studentId],
      references: [students.userId]
    })
  })
)
