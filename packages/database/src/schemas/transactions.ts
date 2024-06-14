import { jsonb, numeric, pgTable, varchar } from "drizzle-orm/pg-core";
import { paymentStatus } from "./payment-status.js";
import { TIMESTAMP_COLUMNS } from "../utils.js";
import { relations } from "drizzle-orm";
import { users } from "./users.js";

export const transactions = pgTable('transactions', {
  id: varchar('id', { length: 32 }).notNull().primaryKey(),
  userId: varchar('user_id', { length: 32 }).notNull(),
  price: numeric('price', { precision: 12, scale: 3 }).notNull(),
  paymentStatus: paymentStatus('payment_status'),
  transactionType: jsonb('transaction_type').notNull(),
  ...TIMESTAMP_COLUMNS
})

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(users, {
    fields: [transactions.userId],
    references: [users.id]
  })
}))
