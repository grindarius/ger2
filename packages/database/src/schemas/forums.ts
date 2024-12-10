import { relations } from 'drizzle-orm'
import { index, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { bytea } from '../types/bytea.js'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { accounts } from './accounts.js'
import { posts } from './posts.js'

export const forums = pgTable(
  'forums',
  {
    id: varchar('id', { length: 26 }).notNull().primaryKey(),
    name: varchar('name', { length: 256 }).notNull(),
    slug: varchar('slug', { length: 32 }).notNull().unique(),
    content: text('content').notNull(),
    accountId: varchar('account_id', { length: 26 })
      .notNull()
      .references(() => accounts.id),
    color: bytea('color').notNull(),
    ...TIMESTAMP_COLUMNS
  },
  t => [index('pgroonga_forums_index').using('pgroonga', t.name)]
)

export const forumsRelations = relations(forums, ({ one, many }) => ({
  account: one(accounts, {
    fields: [forums.accountId],
    references: [accounts.id]
  }),
  posts: many(posts)
}))
