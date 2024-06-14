import { sql } from 'drizzle-orm'
import { numeric, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

export const openingSubjectStudentAssignments = pgTable('opening_subject_student_assignments', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  openingSubjectStudentEnrollmentId: varchar('opening_subject_student_enrollment_id', {
    length: 26
  }).notNull(),
  openingSubjectAssignmentId: varchar('opening_subject_assignment_id', { length: 26 }).notNull(),
  score: numeric('score', { precision: 10, scale: 3 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => sql`now()`)
})
