import { relations } from 'drizzle-orm'
import { pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { forumMembers } from './forum-members.js'

export const forumRoles = pgTable('forum_roles', {
  id: varchar('id', { length: 32 }).notNull().primaryKey(),
  name: varchar('name', { length: 32 }).notNull().unique(),
  description: text('description').notNull()
})

export const forumRolesRelations = relations(forumRoles, ({ many }) => ({
  forums: many(forumMembers)
}))
