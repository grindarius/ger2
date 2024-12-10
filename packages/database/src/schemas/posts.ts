import { relations, sql } from 'drizzle-orm'
import { bigint, index, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { accounts } from './accounts.js'
import { forums } from './forums.js'
import { postReactions } from './post-reactions.js'
import { replies } from './replies.js'

export const posts = pgTable(
  'posts',
  {
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
    views: bigint('views', { mode: 'bigint' }).notNull().default(sql`'0'::bigint`),
    ...TIMESTAMP_COLUMNS
  },
  t => [index('pgroonga_posts_index').using('pgroonga', t.name, t.content)]
)

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
