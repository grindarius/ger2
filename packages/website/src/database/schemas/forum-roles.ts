import { pgTable, text, varchar } from 'drizzle-orm/pg-core'

export const forumRoles = pgTable('forum_roles', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  name: varchar('name', { length: 32 }).notNull().unique(),
  description: text('description').notNull()
})
