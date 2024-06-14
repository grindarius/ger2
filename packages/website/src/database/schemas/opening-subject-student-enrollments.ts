import { relations } from 'drizzle-orm'
import { pgTable, primaryKey, text, varchar } from 'drizzle-orm/pg-core'
import { openingSubjects } from './opening-subjects'
import { students } from './students'

export const openingSubjectStudentEnrollments = pgTable(
  'opening_subject_student_enrollments',
  {
    openingSubectId: varchar('opening_subject_id', { length: 26 })
      .notNull()
      .references(() => openingSubjects.id),
    studentId: varchar('student_id', { length: 26 })
      .notNull()
      .references(() => students.userId),
    classComment: text('class_comment').notNull().default('')
  },
  t => ({
    pk: primaryKey({ columns: [t.openingSubectId, t.studentId] })
  })
)

export const openingSubjectsStudentEnrollmentsRelations = relations(
  openingSubjectStudentEnrollments,
  ({ one }) => ({
    openingSubjects: one(openingSubjects, {
      fields: [openingSubjectStudentEnrollments.openingSubectId],
      references: [openingSubjects.id]
    }),
    student: one(students, {
      fields: [openingSubjectStudentEnrollments.studentId],
      references: [students.userId]
    })
  })
)
