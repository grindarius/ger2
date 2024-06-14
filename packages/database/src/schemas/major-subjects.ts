import { relations } from 'drizzle-orm'
import { pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core'
import { majorSubjectGroups } from './major-subject-groups.js'
import { subjects } from './subjects.js'

export const majorSubjects = pgTable(
  'major_subjects',
  {
    majorSubjectGroupId: varchar('major_subject_group_id', { length: 32 })
      .notNull()
      .references(() => majorSubjectGroups.id),
    subjectId: varchar('subject_id', { length: 32 })
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
