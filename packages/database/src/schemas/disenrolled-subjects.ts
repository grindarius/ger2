import { relations } from 'drizzle-orm'
import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { openingSubjects } from './opening-subjects.js'
import { transactions } from './transactions.js'

/**
 * List of students who gets transferred to another subject,
 * in case a student wanted to disenroll from a subject.
 */
export const disenrolledSubjects = pgTable('disenrolled_subjects', {
  transactionId: varchar('transaction_id', { length: 26 })
    .notNull()
    .primaryKey()
    .references(() => transactions.id),
  subjectId: varchar('subject_id', { length: 26 })
    .notNull()
    .references(() => openingSubjects.id)
})

export const disenrolledSubjectsRelations = relations(disenrolledSubjects, ({ one }) => ({
  openingSubject: one(openingSubjects, {
    fields: [disenrolledSubjects.subjectId],
    references: [openingSubjects.id]
  })
}))
