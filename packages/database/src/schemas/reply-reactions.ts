import { relations } from 'drizzle-orm'
import { pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core'
import { accounts } from './accounts.js'
import { posts } from './posts.js'
import { reactions } from './reactions.js'

export const replyReactions = pgTable(
  'reply_reactions',
  {
    accountId: varchar('account_id', { length: 26 })
      .notNull()
      .references(() => accounts.id),
    reactionId: varchar('reaction_id', { length: 26 })
      .notNull()
      .references(() => reactions.id),
    postId: varchar('post_id', { length: 26 })
      .notNull()
      .references(() => posts.id)
  },
  t => ({
    pk: primaryKey({ columns: [t.accountId, t.reactionId, t.postId] })
  })
)

export const replyReactionsRelations = relations(replyReactions, ({ one }) => ({
  account: one(accounts, {
    fields: [replyReactions.accountId],
    references: [accounts.id]
  }),
  reaction: one(reactions, {
    fields: [replyReactions.reactionId],
    references: [reactions.id]
  }),
  post: one(posts, {
    fields: [replyReactions.postId],
    references: [posts.id]
  })
}))
