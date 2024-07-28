import { relations } from 'drizzle-orm'
import { integer, jsonb, numeric, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { accounts } from './accounts.js'

export const students = pgTable('students', {
  accountId: varchar('account_id', { length: 26 })
    .notNull()
    .primaryKey()
    .references(() => accounts.id),
  majorId: varchar('major_id', { length: 26 }).notNull(),
  academicYearId: varchar('academic_year_id', { length: 26 }).notNull(),
  professorId: varchar('professor_id', { length: 26 }).notNull(),
  studentId: text('student_id').notNull(),
  ehavioralScore: integer('behavioral_score').notNull().default(100),
  status: jsonb('status').notNull(),
  previousGpa: numeric('previous_gpa', { precision: 3, scale: 2 }).notNull(),
  ...TIMESTAMP_COLUMNS
})
