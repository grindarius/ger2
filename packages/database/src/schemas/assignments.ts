import { relations } from 'drizzle-orm'
import { index, numeric, pgTable, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { openingSubjectProfessors } from './opening-subject-professors.js'
import { openingSubjects } from './opening-subjects.js'
import { studentAssignments } from './student-assignments.js'

/**
 * Stores a simple assignments information. This is to keep track of
 * student's scores, then calculate the grades.
 */
export const assignments = pgTable(
  'asssignments',
  {
    id: varchar('id', { length: 26 }).notNull().primaryKey(),
    openingSubjectId: varchar('opening_subject_id', { length: 26 })
      .notNull()
      .references(() => openingSubjects.id),
    openingSubjectProfessorId: varchar('opening_subject_professor_id', { length: 26 })
      .notNull()
      .references(() => openingSubjectProfessors.id),
    name: varchar('name', { length: 256 }).notNull(),
    fullScore: numeric('full_score', { precision: 6, scale: 3 }).notNull(),
    percentage: numeric('percentage', { precision: 5, scale: 2 }).notNull(),
    ...TIMESTAMP_COLUMNS
  },
  t => [index('pgroonga_assignments_index').using('pgroonga', t.name)]
)

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
