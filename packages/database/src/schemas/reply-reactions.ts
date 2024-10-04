import { relations } from 'drizzle-orm'
import { pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core'
import { accounts } from './accounts.js'
import { reactions } from './reactions.js'
import { replies } from './replies.js'

export const replyReactions = pgTable(
  'reply_reactions',
  {
    accountId: varchar('account_id', { length: 26 })
      .notNull()
      .references(() => accounts.id),
    reactionId: varchar('reaction_id', { length: 26 })
      .notNull()
      .references(() => reactions.id),
    replyId: varchar('reply_id', { length: 26 })
      .notNull()
      .references(() => replies.id)
  },
  t => ({
    pk: primaryKey({ columns: [t.accountId, t.reactionId, t.replyId] })
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
  reply: one(replies, {
    fields: [replyReactions.replyId],
    references: [replies.id]
  })
}))
