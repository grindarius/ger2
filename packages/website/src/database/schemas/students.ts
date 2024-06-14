import { relations, sql } from 'drizzle-orm'
import { integer, jsonb, numeric, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { academicYears } from './academic-years'
import { majors } from './majors'
import { users } from './users'
import { professors } from './professors'

export const students = pgTable('students', {
  userId: varchar('user_id', { length: 26 })
    .notNull()
    .primaryKey()
    .references(() => users.id),
  majorId: varchar('major_id', { length: 26 }).notNull(),
  academicYearId: varchar('academic_year_id', { length: 26 }).notNull(),
  professorId: varchar('professor_id', { length: 26 }).notNull(),
  studentId: text('student_id').notNull(),
  studentBehaviorScore: integer('student_behavior_score').notNull(),
  studentStatus: jsonb('student_status').notNull(),
  previousGpa: numeric('previous_gpa', { precision: 3, scale: 2 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => sql`now()`)
})

export const studentsRelations = relations(students, ({ one }) => ({
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
  })
}))
