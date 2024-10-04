import { relations } from 'drizzle-orm'
import { index, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { accounts } from './accounts.js'
import { posts } from './posts.js'
import { replyReactions } from './reply-reactions.js'

export const replies = pgTable(
  'replies',
  {
    id: varchar('id', { length: 26 }).notNull().primaryKey(),
    postId: varchar('post_id', { length: 26 })
      .notNull()
      .references(() => posts.id),
    parentId: varchar('parent_id', { length: 26 }),
    accountId: varchar('account_id', { length: 26 })
      .notNull()
      .references(() => accounts.id),
    content: text('content').notNull(),
    ...TIMESTAMP_COLUMNS
  },
  t => ({
    repliesParentIdIndex: index('replies_parent_id_index').on(t.parentId)
  })
)

export const repliesRelations = relations(replies, ({ one, many }) => ({
  parent: one(replies, {
    fields: [replies.parentId],
    references: [replies.id]
  }),
  post: one(posts, {
    fields: [replies.postId],
    references: [posts.id]
  }),
  account: one(accounts, {
    fields: [replies.accountId],
    references: [accounts.id]
  }),
  reactions: many(replyReactions)
}))
