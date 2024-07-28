import { relations } from 'drizzle-orm'
import { date, pgTable, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { accountNames } from './account-names.js'
import { professors } from './professors.js'
import { role } from './role.js'
import { students } from './students.js'

/**
 * Stores primitive information about an account for all
 * types of users inside a university.
 */
export const accounts = pgTable('accounts', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  username: varchar('username', { length: 40 }).notNull().unique(),
  email: varchar('email', { length: 320 }).notNull().unique(),
  password: varchar('password', { length: 256 }).notNull(),
  role: role('role').notNull(),
  birthdate: date('birthdate', { mode: 'string' }).notNull(),
  ...TIMESTAMP_COLUMNS
})

export const accountsRelations = relations(accounts, ({ one, many }) => ({
  names: many(accountNames),
  student: one(students),
  professor: one(professors)
}))
