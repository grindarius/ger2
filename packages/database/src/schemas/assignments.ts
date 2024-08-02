import { relations } from 'drizzle-orm'
import { numeric, pgTable, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { openingSubjectProfessors } from './opening-subject-professors.js'
import { openingSubjects } from './opening-subjects.js'
import { studentAssignments } from './student-assignments.js'

export const assignments = pgTable('asssignments', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  openingSubjectId: varchar('opening_subject_id', { length: 26 }).notNull(),
  openingSubjectProfessorId: varchar('opening_subject_professor_id', { length: 26 }).notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  fullScore: numeric('full_score', { precision: 6, scale: 3 }).notNull(),
  percentage: numeric('percentage', { precision: 5, scale: 2 }).notNull(),
  ...TIMESTAMP_COLUMNS
})

export const assignmentsRelations = relations(assignments, ({ one, many }) => ({
  openingSubject: one(openingSubjects, {
    fields: [assignments.openingSubjectId],
    references: [openingSubjects.id]
  }),
  openingSubjectProfessor: one(openingSubjectProfessors, {
    fields: [assignments.openingSubjectProfessorId],
    references: [openingSubjectProfessors.id]
  }),
  studentAssignments: many(studentAssignments)
}))
