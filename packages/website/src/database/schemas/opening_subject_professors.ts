import { relations } from 'drizzle-orm'
import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { openingSubjects } from './opening-subjects'
import { professors } from './professors'

export const openingSubjectProfessors = pgTable('opening_subject_professors', {
  openingSubjectId: varchar('opening_subject_id', { length: 26 })
    .notNull()
    .references(() => openingSubjects.id),
  professorId: varchar('professor_id', { length: 26 })
    .notNull()
    .references(() => professors.userId)
})

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
