import { relations, sql } from 'drizzle-orm'
import { date, index, pgTable, timestamp, unique, varchar } from 'drizzle-orm/pg-core'
import { professors } from './professors'
import { role } from './role'
import { students } from './students'
import { userNames } from './user-names'

export const users = pgTable('users', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  username: varchar('username', { length: 48 }).notNull().unique(),
  email: varchar('email', { length: 320 }).notNull(),
  password: varchar('password', { length: 256 }).notNull(),
  role: role('role').notNull(),
  birthdate: date('birthdate', { mode: 'string' }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => sql`now()`)
})

export const usersRelations = relations(users, ({ one, many }) => ({
  names: many(userNames),
  student: one(students),
  professor: one(professors)
}))
