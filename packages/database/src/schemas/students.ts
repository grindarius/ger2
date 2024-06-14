import { relations } from 'drizzle-orm'
import { integer, jsonb, numeric, pgTable, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { academicYears } from './academic-years.js'
import { majors } from './majors.js'
import { openingSubjectAdditionalEligibleStudents } from './opening-subject-additional-eligible-students.js'
import { openingSubjectStudentEnrollments } from './opening-subject-student-enrollments.js'
import { professors } from './professors.js'
import { users } from './users.js'

export const students = pgTable('students', {
  userId: varchar('user_id', { length: 32 })
    .notNull()
    .primaryKey()
    .references(() => users.id),
  majorId: varchar('major_id', { length: 32 }).notNull(),
  academicYearId: varchar('academic_year_id', { length: 32 }).notNull(),
  professorId: varchar('professor_id', { length: 32 }).notNull(),
  studentId: varchar('student_id', { length: 32 }).notNull(),
  studentBehaviorScore: integer('student_behavior_score').notNull(),
  studentStatus: jsonb('student_status').notNull(),
  previousGpa: numeric('previous_gpa', { precision: 3, scale: 2 }).notNull(),
  ...TIMESTAMP_COLUMNS
})

export const studentsRelations = relations(students, ({ one, many }) => ({
  major: one(majors, {
    fields: [students.majorId],
    references: [majors.id]
  }),
  academicYear: one(academicYears, {
    fields: [students.academicYearId],
    references: [academicYears.id]
  }),
  professor: one(professors, {
    fields: [students.professorId],
    references: [professors.userId]
  }),
  openingSubjectAdditionalEligibleStudents: many(openingSubjectAdditionalEligibleStudents),
  openingSubjectStudentEnrollments: many(openingSubjectStudentEnrollments)
}))
