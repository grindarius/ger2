import { relations } from 'drizzle-orm'
import { date, pgTable, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { forumMembers } from './forum-members.js'
import { professors } from './professors.js'
import { role } from './role.js'
import { students } from './students.js'
import { transactions } from './transactions.js'
import { userNames } from './user-names.js'
import { userSessions } from './user-sessions.js'

export const users = pgTable('users', {
  id: varchar('id', { length: 32 }).notNull().primaryKey(),
  username: varchar('username', { length: 32 }).notNull().unique(),
  email: varchar('email', { length: 320 }).notNull().unique(),
  password: varchar('password', { length: 256 }).notNull(),
  role: role('role').notNull(),
  birthdate: date('birthdate').notNull(),
  ...TIMESTAMP_COLUMNS
})

export const usersRelations = relations(users, ({ one, many }) => ({
  names: many(userNames),
  professor: one(professors),
  student: one(students),
  transactions: many(transactions),
  sessions: many(userSessions),
  forums: many(forumMembers)
}))
