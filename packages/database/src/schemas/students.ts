import { relations } from 'drizzle-orm'
import { integer, jsonb, numeric, pgTable, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { accounts } from './accounts.js'
import { assignments } from './assignments.js'
import { openingSubjectAdditionalStudents } from './opening-subject-additional-students.js'

/**
 * Stores student specific information.
 */
export const students = pgTable('students', {
  accountId: varchar('account_id', { length: 26 })
    .notNull()
    .primaryKey()
    .references(() => accounts.id),
  majorId: varchar('major_id', { length: 26 }).notNull(),
  academicYearId: varchar('academic_year_id', { length: 26 }).notNull(),
  professorId: varchar('professor_id', { length: 26 }).notNull(),

  /**
   * A meaningful student id easy for remembering.
   */
  studentId: varchar('student_id', { length: 32 }).notNull().unique(),

  /**
   * Student's behavioral score, if this score falls below 40, a student's status
   * will be removed.
   */
  behavioralScore: integer('behavioral_score').notNull().default(100),

  /**
   * Json storing information about a student including more info needed for a student
   * status.
   */
  status: jsonb('status').notNull(),

  /**
   * Student's GPA from previous school.
   */
  previousGpa: numeric('previous_gpa', { precision: 3, scale: 2 }).notNull(),
  ...TIMESTAMP_COLUMNS
})

export const studentsRelations = relations(students, ({ many }) => ({
  openingSubjectAdditionalStudents: many(openingSubjectAdditionalStudents),
  assignments: many(assignments)
}))
