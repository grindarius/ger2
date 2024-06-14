import { relations } from 'drizzle-orm'
import { pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core'
import { openingSubjects } from './opening-subjects.js'
import { professors } from './professors.js'

export const openingSubjectProfessors = pgTable(
  'opening_subject_professors',
  {
    openingSubjectId: varchar('opening_subject_id', { length: 32 })
      .notNull()
      .references(() => openingSubjects.id),
    professorId: varchar('professor_id', { length: 32 })
      .notNull()
      .references(() => professors.userId)
  },
  t => ({ pk: primaryKey({ columns: [t.openingSubjectId, t.professorId] }) })
)

export const openingSubjectProfessorsRelations = relations(openingSubjectProfessors, ({ one }) => ({
  openingSubject: one(openingSubjects, {
    fields: [openingSubjectProfessors.openingSubjectId],
    references: [openingSubjects.id]
  }),
  professor: one(professors, {
    fields: [openingSubjectProfessors.professorId],
    references: [professors.userId]
  })
}))
