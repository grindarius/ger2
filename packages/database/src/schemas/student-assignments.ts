import { relations } from 'drizzle-orm'
import { numeric, pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { assignments } from './assignments.js'
import { studentEnrollments } from './student-enrollments.js'

export const studentAssignments = pgTable(
  'student_assignments',
  {
    assignmentId: varchar('assignment_id', { length: 26 })
      .notNull()
      .references(() => assignments.id),
    studentEnrollmentId: varchar('student_enrollment_id', { length: 26 })
      .notNull()
      .references(() => studentEnrollments.id),
    score: numeric('score', { precision: 6, scale: 3 }).notNull(),
    ...TIMESTAMP_COLUMNS
  },
  t => ({
    pk: primaryKey({ columns: [t.assignmentId, t.studentEnrollmentId] })
  })
)

export const studentAssignmentsRelations = relations(studentAssignments, ({ one }) => ({
  assignment: one(assignments, {
    fields: [studentAssignments.assignmentId],
    references: [assignments.id]
  }),
  studentEnrollment: one(studentEnrollments, {
    fields: [studentAssignments.studentEnrollmentId],
    references: [studentEnrollments.id]
  })
}))
