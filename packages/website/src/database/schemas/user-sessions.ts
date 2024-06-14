import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'

export const userSessions = pgTable('user_sessions', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  userId: varchar('user_id', { length: 26 }).notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'string' }).notNull()
})
