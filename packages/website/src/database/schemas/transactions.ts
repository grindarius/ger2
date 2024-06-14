import { sql } from 'drizzle-orm'
import { jsonb, numeric, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'
import { paymentStatus } from './payment-status'

export const transactions = pgTable('transactions', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  userId: varchar('user_id', { length: 26 }).notNull(),
  price: numeric('price', { precision: 12, scale: 3 }).notNull(),
  paymentStatus: paymentStatus('payment_status').notNull(),
  transactionType: jsonb('transaction_type'),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => sql`now()`)
})
