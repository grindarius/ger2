import { relations } from 'drizzle-orm'
import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { openingSubjects } from './opening-subjects.js'
import { transactions } from './transactions.js'

export const movedSubjects = pgTable('moved_subjects', {
  transactionId: varchar('transaction_id', { length: 26 })
    .notNull()
    .primaryKey()
    .references(() => transactions.id),
  sourceSubjectId: varchar('source_subject_id', { length: 26 })
    .notNull()
    .references(() => openingSubjects.id),
  destinationSubjectId: varchar('destination_subject_id', { length: 26 })
    .notNull()
    .references(() => openingSubjects.id)
})

export const movedSubjectsRelations = relations(movedSubjects, ({ one }) => ({
  sourceOpeningSubject: one(openingSubjects, {
    fields: [movedSubjects.sourceSubjectId],
    references: [openingSubjects.id]
  }),
  destinationOpeningSubject: one(openingSubjects, {
    fields: [movedSubjects.destinationSubjectId],
    references: [openingSubjects.id]
  })
}))
