import { relations } from 'drizzle-orm'
import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { accounts } from './accounts.js'
import { openingSubjectProfessors } from './opening-subject-professors.js'

/**
 * Stores information of a professor.
 */
export const professors = pgTable('professors', {
  accountId: varchar('account_id', { length: 26 })
    .notNull()
    .primaryKey()
    .references(() => accounts.id),

  /**
   * The rank of a professor, something like Ph. D., or Msc.
   */
  rank: varchar('rank', { length: 128 }).notNull(),
  ...TIMESTAMP_COLUMNS
})

export const professorsRelations = relations(professors, ({ many }) => ({
  openingSubjectProfessors: many(openingSubjectProfessors)
}))
