import { relations } from 'drizzle-orm'
import { pgTable, pgTableCreator, primaryKey, varchar } from 'drizzle-orm/pg-core'
import { majorSubjectGroups } from './major-subject-groups'
import { subjects } from './subjects'

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
    pk: primaryKey({ columns: [t.majorSubjectGroupId, t.subjectId] })
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
