import { relations } from 'drizzle-orm'
import { integer, jsonb, numeric, pgTable, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { academicYears } from './academic-years.js'
import { accounts } from './accounts.js'
import { assignments } from './assignments.js'
import { majors } from './majors.js'
import { openingSubjectAdditionalStudents } from './opening-subject-additional-students.js'
import { professors } from './professors.js'

/**
 * Stores student specific information.
 */
export const students = pgTable('students', {
  accountId: varchar('account_id', { length: 26 })
    .notNull()
    .primaryKey()
    .references(() => accounts.id),
  majorId: varchar('major_id', { length: 26 })
    .notNull()
    .references(() => majors.id),
  academicYearId: varchar('academic_year_id', { length: 26 })
    .notNull()
    .references(() => academicYears.id),
  professorId: varchar('professor_id', { length: 26 })
    .notNull()
    .references(() => professors.accountId),

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

export type Studying = {
  type: 'Studying'
}

export type RestingForTreatment = {
  type: 'RestingForTreatment'
  semester_id: string
}

export type Resting = {
  type: 'Resting'
  semester_id: string
}

export type ForcedToRest = {
  type: 'ForcedToRest'
  semester_id: string
}

export type RetiredByInsufficientGrades = {
  type: 'RetiredByInsufficientGrades'
  retired_at: string
}

export type RetiredByNotPaying = {
  type: 'RetiredByNotPaying'
  retired_at: string
}

export type RetiredByNotSigning = {
  type: 'RetiredByNotSigning'
  retired_at: string
}

export type RetiredBySigningButNotPaying = {
  type: 'RetiredBySigningButNotPaying'
  retired_at: string
}

export type RetiredByRunningOutOfTimeToStudy = {
  type: 'RetiredByRunningOutOfTimeToStudy'
  retired_at: string
}

export type RetiredByHavingInsufficientEnglishGrades = {
  type: 'RetiredByHavingInsufficientEnglishGrades'
  retired_at: string
}

export type Resigned = {
  type: 'Resigned'
  resigned_at: string
  reason: string
}

export type Fired = {
  type: 'Fired'
  fired_at: string
  reason: string
}

export type Deceased = {
  type: 'Deceased'
  deceased_at: string
}

export type Graduated = {
  type: 'Graduated'
  graduated_at: string
}

export type StudentStatus =
  | Studying
  | RestingForTreatment
  | Resting
  | ForcedToRest
  | RetiredByInsufficientGrades
  | RetiredByNotPaying
  | RetiredByNotSigning
  | RetiredBySigningButNotPaying
  | RetiredByRunningOutOfTimeToStudy
  | RetiredByHavingInsufficientEnglishGrades
  | Resigned
  | Fired
  | Deceased
  | Graduated
