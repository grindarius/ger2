import { relations } from 'drizzle-orm'
import { index, integer, numeric, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { majorSubjects } from './major-subjects.js'
import { majors } from './majors.js'

/**
 * Stores hierarchical data about the group of each subjects and
 * the minimum credit of each group.
 */
export const majorSubjectGroups = pgTable(
  'major_subject_groups',
  {
    id: varchar('id', { length: 26 }).notNull().primaryKey(),
    majorId: varchar('major_id', { length: 26 })
      .notNull()
      .references(() => majors.id),
    groupIndex: integer('group_index').notNull(),
    parentId: varchar('parent_id', { length: 26 }),
    name: text('name').notNull(),
    minimumCredit: numeric('minimum_credit', { precision: 4, scale: 1 }).notNull(),
    ...TIMESTAMP_COLUMNS
  },
  t => ({
    majorSubjectGroupsParentIdIndex: index('major_subject_groups_parent_id_index').on(t.parentId)
  })
)

export const majorSubjectGroupsRelations = relations(majorSubjectGroups, ({ one, many }) => ({
  parentSubjectGroup: one(majorSubjectGroups, {
    fields: [majorSubjectGroups.parentId],
    references: [majorSubjectGroups.id]
  }),
  majorSubjects: many(majorSubjects),
  major: one(majors, {
    fields: [majorSubjectGroups.majorId],
    references: [majors.id]
  })
}))
