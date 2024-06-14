import { relations } from "drizzle-orm";
import { pgTable, varchar, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users.js";

export const userSessions = pgTable('user_sessions', {
  id: varchar('id', { length: 32 }).notNull().primaryKey(),
  userId: varchar('user_id', { length: 32 }).notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'string' }).notNull()
})

export const userSessionsRelations = relations(userSessions, ({ one }) => ({
  user: one(users, {
    fields: [userSessions.userId],
    references: [users.id]
  })
}))
