import { relations } from 'drizzle-orm'
import { pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { users } from './users.js'

export const userNames = pgTable('user_names', {
  id: varchar('id', { length: 32 }).notNull().primaryKey(),
  userId: varchar('user_id', { length: 32 }).notNull(),
  nameLanguage: varchar('name_language', { length: 2 }).notNull(),
  firstName: text('first_name').notNull(),
  middleName: text('middle_name').notNull().default(''),
  lastName: text('last_name').notNull().default(''),
  ...TIMESTAMP_COLUMNS
})

export const userNamesRelations = relations(userNames, ({ one }) => ({
  user: one(users, {
    fields: [userNames.userId],
    references: [users.id]
  })
}))
