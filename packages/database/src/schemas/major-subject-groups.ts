import { relations } from 'drizzle-orm'
import { integer, numeric, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { majors } from './majors.js'
import { majorSubjects } from './major-subjects.js'

export const majorSubjectGroups = pgTable('major_subject_groups', {
  id: varchar('id', { length: 32 }).notNull().primaryKey(),
  majorId: varchar('major_id', { length: 32 }).notNull(),
  groupIndex: integer('group_index').notNull(),
  parentId: varchar('parent_id'),
  name: text('name').notNull(),
  minimumCredit: numeric('minimum_credit', { precision: 4, scale: 1 }),
  ...TIMESTAMP_COLUMNS
})

export const majorSubjectGroupsRelations = relations(majorSubjectGroups, ({ one, many }) => ({
  parent: one(majorSubjectGroups, {
    fields: [majorSubjectGroups.parentId],
    references: [majorSubjectGroups.id]
  }),
  major: one(majors, {
    fields: [majorSubjectGroups.majorId],
    references: [majors.id]
  }),
  subjects: many(majorSubjects)
}))
