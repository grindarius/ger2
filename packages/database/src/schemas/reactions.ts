import { relations } from 'drizzle-orm'
import { integer, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { accounts } from './accounts.js'
import { postReactions } from './post-reactions.js'
import { replyReactions } from './reply-reactions.js'

export const reactions = pgTable('reactions', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  slug: varchar('slug', { length: 32 }).notNull().unique(),
  icon: text('icon').notNull(),
  score: integer('score'),
  accountId: varchar('account_id', { length: 26 }).references(() => accounts.id),
  ...TIMESTAMP_COLUMNS
})

export const reactionsRelations = relations(reactions, ({ one, many }) => ({
  replyReactions: many(replyReactions),
  postReactions: many(postReactions),
  account: one(accounts, {
    fields: [reactions.accountId],
    references: [accounts.id]
  })
}))
