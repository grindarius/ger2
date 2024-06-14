import { relations } from 'drizzle-orm'
import { numeric, pgTable, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { openingSubjectAssignments } from './opening-subject-assignments.js'
import { openingSubjectStudentEnrollments } from './opening-subject-student-enrollments.js'

export const openingSubjectStudentAssignments = pgTable('opening_subject_student_assignments', {
  openingSubjectAssignmentId: varchar('opening_subject_assignment_id', { length: 32 })
    .notNull()
    .references(() => openingSubjectAssignments.id),
  openingSubjectStudentEnrollmentStudentId: varchar(
    'opening_subject_student_enrollment_student_id',
    { length: 32 }
  )
    .notNull()
    .references(() => openingSubjectStudentEnrollments.studentId),
  score: numeric('score', { precision: 10, scale: 3 }).notNull(),
  ...TIMESTAMP_COLUMNS
})

export const openingSubjectStudentAssignmentsRelations = relations(
  openingSubjectStudentAssignments,
  ({ one }) => ({
    assignment: one(openingSubjectAssignments, {
      fields: [openingSubjectStudentAssignments.openingSubjectAssignmentId],
      references: [openingSubjectAssignments.id]
    }),
    student: one(openingSubjectStudentEnrollments, {
      fields: [openingSubjectStudentAssignments.openingSubjectStudentEnrollmentStudentId],
      references: [openingSubjectStudentEnrollments.studentId]
    })
  })
)
