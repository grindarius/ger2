import { relations } from 'drizzle-orm'
import { integer, jsonb, pgTable, uniqueIndex, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { openingSubjectAdditionalEligibleStudents } from './opening-subject-additional-eligible-students.js'
import { openingSubjectAssignments } from './opening-subject-assignments.js'
import { openingSubjectEligibleMajors } from './opening-subject-eligible-majors.js'
import { openingSubjectProfessors } from './opening-subject-professors.js'
import { openingSubjectSchedules } from './opening-subject-schedules.js'
import { openingSubjectStudentEnrollments } from './opening-subject-student-enrollments.js'
import { semesters } from './semesters.js'
import { subjects } from './subjects.js'

export const openingSubjects = pgTable(
  'opening_subjects',
  {
    id: varchar('id', { length: 32 }).notNull().primaryKey(),
    subjectId: varchar('subject_id', { length: 32 }).notNull(),
    semesterId: varchar('semester_id', { length: 32 }).notNull(),
    subjectCapacity: integer('subject_capacity').notNull(),
    gradingCriteria: jsonb('grading_criteria').notNull(),
    ...TIMESTAMP_COLUMNS
  },
  t => ({
    subjectSemesterUniqueIndex: uniqueIndex(
      'opening_subjects_subject_id_semester_id_unique_constraint'
    ).on(t.subjectId, t.semesterId)
  })
)

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
