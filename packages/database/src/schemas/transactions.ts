import { relations } from 'drizzle-orm'
import { numeric, pgTable, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { accounts } from './accounts.js'
import { enrolledSubjects } from './enrolled-subjects.js'
import { transactionStatus } from './transaction-status.js'
import { transactionType } from './transaction-type.js'
import { movedSubjects } from './moved-subjects.js'

export const transactions = pgTable('transactions', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  transactionType: transactionType('transaction_type').notNull(),
  transactionStatus: transactionStatus('transaction_status').notNull(),
  accountId: varchar('account_id', { length: 26 }).notNull(),
  price: numeric('price', { precision: 12, scale: 2 }).notNull(),
  ...TIMESTAMP_COLUMNS
})

export const transactionsRelations = relations(transactions, ({ one, many }) => ({
  account: one(accounts, {
    fields: [transactions.accountId],
    references: [accounts.id]
  }),
  enrolledSubjects: many(enrolledSubjects),
  movedSubject: one(movedSubjects)
}))
