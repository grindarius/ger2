import { relations } from 'drizzle-orm'
import { pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core'
import { accounts } from './accounts.js'
import { posts } from './posts.js'
import { reactions } from './reactions.js'

export const postReactions = pgTable(
  'post_reactions',
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
  t => [primaryKey({ columns: [t.accountId, t.reactionId, t.postId] })]
)

export const postReactionsRelations = relations(postReactions, ({ one }) => ({
  account: one(accounts, {
    fields: [postReactions.accountId],
    references: [accounts.id]
  }),
  reaction: one(reactions, {
    fields: [postReactions.reactionId],
    references: [reactions.id]
  }),
  post: one(posts, {
    fields: [postReactions.postId],
    references: [posts.id]
  })
}))
