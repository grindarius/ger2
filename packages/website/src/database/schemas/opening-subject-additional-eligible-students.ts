import { relations } from 'drizzle-orm'
import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { openingSubjects } from './opening-subjects'
import { students } from './students'

export const openingSubjectAdditionalEligibleStudents = pgTable(
  'opening_subject_additional_eligible_students',
  {
    openingSubjectId: varchar('opening_subject_id', { length: 26 })
      .notNull()
      .references(() => openingSubjects.id),
    studentId: varchar('student_id')
      .notNull()
      .references(() => students.userId)
  }
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
