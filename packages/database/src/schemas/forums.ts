import { relations } from 'drizzle-orm'
import { pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { forumMembers } from './forum-members.js'
import { forumPosts } from './forum-posts.js'

export const forums = pgTable('forums', {
  id: varchar('id', { length: 32 }).notNull().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  description: text('description').notNull(),
  ...TIMESTAMP_COLUMNS
})

export const forumRelations = relations(forums, ({ one, many }) => ({
  posts: many(forumPosts),
  members: many(forumMembers)
}))
