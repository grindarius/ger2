import { relations } from 'drizzle-orm'
import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { assignments } from './assignments.js'
import { openingSubjects } from './opening-subjects.js'
import { professors } from './professors.js'

/**
 * Stores list of professors that will teach a subject.
 */
export const openingSubjectProfessors = pgTable('opening_subject_professors', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  openingSubjectId: varchar('opening_subject_id', { length: 26 })
    .notNull()
    .references(() => openingSubjects.id),
  professorId: varchar('professor_id', { length: 26 })
    .notNull()
    .references(() => professors.accountId)
})

export const openingSubjectProfessorsRelations = relations(
  openingSubjectProfessors,
  ({ one, many }) => ({
    openingSubject: one(openingSubjects, {
      fields: [openingSubjectProfessors.openingSubjectId],
      references: [openingSubjects.id]
    }),
    professor: one(professors, {
      fields: [openingSubjectProfessors.professorId],
      references: [professors.accountId]
    }),
    assignments: many(assignments)
  })
)
