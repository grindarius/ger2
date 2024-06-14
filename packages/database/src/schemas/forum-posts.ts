import { relations } from 'drizzle-orm'
import { pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { forumMembers } from './forum-members.js'
import { forums } from './forums.js'

export const forumPosts = pgTable('forum_posts', {
  id: varchar('id', { length: 32 }).notNull().primaryKey(),
  forumId: varchar('forum_id', { length: 32 }).notNull(),
  memberUserId: varchar('member_user_id', { length: 32 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  content: text('content').notNull(),
  ...TIMESTAMP_COLUMNS
})

export const forumPostsRelations = relations(forumPosts, ({ one }) => ({
  forum: one(forums, {
    fields: [forumPosts.forumId],
    references: [forums.id]
  }),
  member: one(forumMembers, {
    fields: [forumPosts.memberUserId],
    references: [forumMembers.userId]
  })
}))
