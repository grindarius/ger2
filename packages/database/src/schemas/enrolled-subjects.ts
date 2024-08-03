import { relations } from 'drizzle-orm'
import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { openingSubjects } from './opening-subjects.js'
import { transactions } from './transactions.js'

/**
 * Stores subjects that an account has enrolled.
 * Can be more than one.
 */
export const enrolledSubjects = pgTable('enrolled_subjects', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  transactionId: varchar('transactionId', { length: 26 })
    .notNull()
    .references(() => transactions.id),
  openingSubjectId: varchar('opening_subject_id', { length: 26 }).notNull()
})

export const enrolledSubjectsRelations = relations(enrolledSubjects, ({ one }) => ({
  transaction: one(transactions, {
    fields: [enrolledSubjects.transactionId],
    references: [transactions.id]
  }),
  openingSubject: one(openingSubjects, {
    fields: [enrolledSubjects.openingSubjectId],
    references: [openingSubjects.id]
  })
}))
