import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { accounts } from './accounts.js'
import { forums } from './forums.js'
import { postReactions } from './post-reactions.js'
import { replies } from './replies.js'

export const posts = pgTable('posts', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  name: varchar('name', { length: 26 }).notNull(),
  accountId: varchar('account_id', { length: 26 })
    .notNull()
    .references(() => accounts.id),
  forumId: varchar('forum_id', { length: 26 })
    .notNull()
    .references(() => forums.id),
  content: text('content').notNull().default(''),
  lastActiveAt: timestamp('last_active_at', { mode: 'string' }).notNull().defaultNow(),
  ...TIMESTAMP_COLUMNS
})

export const postsRelations = relations(posts, ({ one, many }) => ({
  forum: one(forums, {
    fields: [posts.forumId],
    references: [forums.id]
  }),
  account: one(accounts, {
    fields: [posts.accountId],
    references: [accounts.id]
  }),
  replies: many(replies),
  reactions: many(postReactions)
}))
