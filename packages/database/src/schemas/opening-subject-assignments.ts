import { relations } from 'drizzle-orm'
import { numeric, pgTable, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { openingSubjects } from './opening-subjects.js'
import { openingSubjectStudentAssignments } from './opening-subject-student-assignments.js'

export const openingSubjectAssignments = pgTable('opening_subject_assignments', {
  id: varchar('id', { length: 32 }).notNull().primaryKey(),
  openingSubjectId: varchar('opening_subject_id', { length: 32 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  fullScore: numeric('full_score', { precision: 10, scale: 3 }).notNull(),
  percentage: numeric('percentage', { precision: 5, scale: 2 }).notNull(),
  ...TIMESTAMP_COLUMNS
})

export const openingSubjectAssignmentsRelations = relations(
  openingSubjectAssignments,
  ({ one, many }) => ({
    openingSubject: one(openingSubjects, {
      fields: [openingSubjectAssignments.openingSubjectId],
      references: [openingSubjects.id]
    }),
    studentAssignments: many(openingSubjectStudentAssignments)
  })
)
