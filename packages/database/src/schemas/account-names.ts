import { relations } from 'drizzle-orm'
import { index, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { accounts } from './accounts.js'

/**
 * Stores name of an account in multiple languages. Must have at least 1 name in any language.
 */
export const accountNames = pgTable(
  'account_names',
  {
    id: varchar('id', { length: 26 }).notNull().primaryKey(),
    accountId: varchar('account_id', { length: 26 })
      .notNull()
      .references(() => accounts.id),

    /**
     * ISO 639-1 language code in lowercase.
     */
    nameLanguage: varchar('name_language', { length: 2 }).notNull(),
    firstName: text('first_name').notNull(),
    middleName: text('middle_name').notNull(),
    lastName: text('last_name').notNull(),
    ...TIMESTAMP_COLUMNS
  },
  t => ({
    pgroongaAccountNameIndex: index('pgroonga_account_names_index').using(
      'pgroonga',
      t.firstName,
      t.middleName,
      t.lastName
    )
  })
)

export const accountNamesRelations = relations(accountNames, ({ one }) => ({
  account: one(accounts, {
    fields: [accountNames.accountId],
    references: [accounts.id]
  })
}))
