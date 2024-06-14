import { sql } from 'drizzle-orm'
import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const forumPostComments = pgTable('forum_post_comments', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  forumPostId: varchar('forum_post_id', { length: 26 }).notNull(),
  forumMemberId: varchar('forum_member_id', { length: 26 }).notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => sql`now()`)
})
