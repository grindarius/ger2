import { relations } from 'drizzle-orm'
import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { accounts } from './accounts.js'
import { openingSubjectProfessors } from './opening-subjects-professors.js'

export const professors = pgTable('professors', {
  accountId: varchar('account_id', { length: 26 })
    .notNull()
    .primaryKey()
    .references(() => accounts.id),
  rank: varchar('rank', { length: 128 }).notNull(),
  ...TIMESTAMP_COLUMNS
})

export const professorsRelations = relations(professors, ({ one, many }) => ({
  account: one(accounts, {
    fields: [professors.accountId],
    references: [accounts.id]
  }),
  openingSubjectProfessors: many(openingSubjectProfessors)
}))
