import { relations } from 'drizzle-orm'
import { numeric, pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { assignments } from './assignments.js'
import { students } from './students.js'

/**
 * Stores scores of a student with given assignment.
 *
 * We can directly use the `accountId` as the `studentId`.
 */
export const studentAssignments = pgTable(
  'student_assignments',
  {
    assignmentId: varchar('assignment_id', { length: 26 })
      .notNull()
      .references(() => assignments.id),
    studentId: varchar('student_id', { length: 26 })
      .notNull()
      .references(() => students.accountId),
    score: numeric('score', { precision: 6, scale: 3 }).notNull(),
    ...TIMESTAMP_COLUMNS
  },
  t => ({
    pk: primaryKey({ columns: [t.assignmentId, t.studentId] })
  })
)

export const studentAssignmentsRelations = relations(studentAssignments, ({ one }) => ({
  assignment: one(assignments, {
    fields: [studentAssignments.assignmentId],
    references: [assignments.id]
  }),
  student: one(students, {
    fields: [studentAssignments.studentId],
    references: [students.accountId]
  })
}))
