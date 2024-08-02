import { relations } from 'drizzle-orm'
import { integer, jsonb, pgTable, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { assignments } from './assignments.js'
import { enrolledSubjects } from './enrolled-subjects.js'
import { movedSubjects } from './moved-subjects.js'
import { openingSubjectAdditionalStudents } from './opening-subject-additional-students.js'
import { openingSubjectEligibleMajors } from './opening-subject-eligible-majors.js'
import { openingSubjectProfessors } from './opening-subject-professors.js'
import { openingSubjectSchedules } from './opening-subject-schedules.js'
import { semesters } from './semesters.js'
import { subjects } from './subjects.js'

/**
 * Stores information about opening subjects inside a semester.
 * The rules for opening a semester is that,
 *
 * - it is unique between a `subject_id`, `semester_id`.
 */
export const openingSubjects = pgTable('opening_subjects', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  subjectId: varchar('subject_id', { length: 26 }).notNull(),
  semesterId: varchar('semester_id', { length: 26 }).notNull(),
  subject_capacity: integer('subject_capicity').notNull(),
  grading_criteria: jsonb('grading_criteria').notNull(),
  ...TIMESTAMP_COLUMNS
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
  openingSubjectSchedules: many(openingSubjectSchedules),
  openingSubjectProfessors: many(openingSubjectProfessors),
  openingSubjectEligibleMajors: many(openingSubjectEligibleMajors),
  openingSubjectAdditionalStudents: many(openingSubjectAdditionalStudents),
  enrolledSubjects: many(enrolledSubjects),
  assignments: many(assignments),
  sourceSubjects: many(movedSubjects),
  destinationSubjects: many(movedSubjects)
}))
