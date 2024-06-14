import { relations, sql } from 'drizzle-orm'
import { index, integer, numeric, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { majors } from './majors'
import { subjects } from './subjects'

export const majorSubjectGroups = pgTable(
  'major_subject_groups',
  {
    id: varchar('id', { length: 26 }).notNull().primaryKey(),
    majorId: varchar('major_id', { length: 26 }).notNull(),
    groupIndex: integer('group_index').notNull(),
    parentId: varchar('parent_id', { length: 26 }),
    name: text('name').notNull(),
    minimumCredit: numeric('minimum_credit', { precision: 2, scale: 1 }),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
      .notNull()
      .defaultNow()
      .$onUpdateFn(() => sql`now()`)
  },
  t => ({
    parentIdIdx: index().on(t.parentId).using(sql`btree`)
  })
)

export const majorSubjectGroupsRelations = relations(majorSubjectGroups, ({ one, many }) => ({
  major: one(majors, {
    fields: [majorSubjectGroups.majorId],
    references: [majors.id]
  }),
  subjects: many(subjects)
}))
