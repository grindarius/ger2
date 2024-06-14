import { relations, sql } from 'drizzle-orm'
import { numeric, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'
import { openingSubjects } from './opening-subjects'

export const openingSubjectAssignments = pgTable('opening_subject_assignments', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  openingSubjectId: varchar('opening_subject_id', { length: 26 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  fullScore: numeric('full_score', { precision: 10, scale: 3 }).notNull(),
  percentage: numeric('percentage', { precision: 5, scale: 2 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => sql`now()`)
})

export const openingSubjectsAssignmentsRelations = relations(
  openingSubjectAssignments,
  ({ one }) => ({
    openingSubject: one(openingSubjects, {
      fields: [openingSubjectAssignments.openingSubjectId],
      references: [openingSubjects.id]
    })
  })
)
