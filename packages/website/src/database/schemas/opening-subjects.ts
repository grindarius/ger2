import { relations, sql } from 'drizzle-orm'
import { integer, jsonb, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'
import { openingSubjectAdditionalEligibleStudents } from './opening-subject-additional-eligible-students'
import { openingSubjectEligibleMajors } from './opening-subject-eligible-majors'
import { openingSubjectSchedules } from './opening-subject-schedules'
import { openingSubjectStudentEnrollments } from './opening-subject-student-enrollments'
import { openingSubjectProfessors } from './opening_subject_professors'
import { semesters } from './semesters'
import { subjects } from './subjects'
import { openingSubjectAssignments } from './opening-subject-assignments'

export const openingSubjects = pgTable('opening_subjects', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  subjectId: varchar('subject_id', { length: 26 }).notNull(),
  semesterId: varchar('semester_id', { length: 26 }).notNull(),
  subjectCapacity: integer('subject_capacity').notNull(),
  gradingCriteria: jsonb('grading_criteria'),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => sql`now()`)
})

export const openingSubjectsRelations = relations(openingSubjects, ({ one, many }) => ({
  subject: one(subjects, {
    fields: [openingSubjects.subjectId],
    references: [subjects.id]
  }),
  semester: one(semesters, {
    fields: [openingSubjects.semesterId],
    references: [semesters.id]
  }),
  schedules: many(openingSubjectSchedules),
  professors: many(openingSubjectProfessors),
  eligibleMajors: many(openingSubjectEligibleMajors),
  additionalEligibleStudents: many(openingSubjectAdditionalEligibleStudents),
  studentEnrollments: many(openingSubjectStudentEnrollments),
  assignments: many(openingSubjectAssignments)
}))
