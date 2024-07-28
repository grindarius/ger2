import { relations } from 'drizzle-orm'
import { pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core'
import { majorSubjectGroups } from './major-subject-groups.js'
import { subjects } from './subjects.js'

/**
 * Stores subjects related to its category and major.
 * The major subject group id will likely be the leaf id
 * of the `major_subject_group` table.
 */
export const majorSubjects = pgTable(
  'major_subjects',
  {
    majorSubjectGroupId: varchar('major_subject_group_id', { length: 26 })
      .notNull()
      .references(() => majorSubjectGroups.id),
    subjectId: varchar('subject_id', { length: 26 })
      .notNull()
      .references(() => subjects.id)
  },
  t => ({
    pk: primaryKey({ columns: [t.subjectId, t.majorSubjectGroupId] })
  })
)

export const majorSubjectsRelations = relations(majorSubjects, ({ one }) => ({
  majorSubjectGroup: one(majorSubjectGroups, {
    fields: [majorSubjects.majorSubjectGroupId],
    references: [majorSubjectGroups.id]
  }),
  subject: one(subjects, {
    fields: [majorSubjects.subjectId],
    references: [subjects.id]
  })
}))
