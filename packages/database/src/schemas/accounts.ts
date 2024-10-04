import { relations, sql } from 'drizzle-orm'
import { date, pgTable, uniqueIndex, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { accountNames } from './account-names.js'
import { forums } from './forums.js'
import { postReactions } from './post-reactions.js'
import { posts } from './posts.js'
import { professors } from './professors.js'
import { reactions } from './reactions.js'
import { replies } from './replies.js'
import { replyReactions } from './reply-reactions.js'
import { role } from './role.js'
import { students } from './students.js'
import { transactions } from './transactions.js'

/**
 * Stores primitive information about an account for all
 * types of users inside a university.
 */
export const accounts = pgTable(
  'accounts',
  {
    id: varchar('id', { length: 26 }).notNull().primaryKey(),

    /**
     * 30 character string that only matches `[A-Za-z0-9_-]{2,30}` regexp.
     *
     * No limits to the profanity of the username.
     */
    username: varchar('username', { length: 30 }).notNull().unique(),
    email: varchar('email', { length: 320 }).notNull().unique(),
    password: varchar('password', { length: 256 }).notNull(),
    role: role('role').notNull(),
    birthdate: date('birthdate', { mode: 'string' }).notNull(),
    ...TIMESTAMP_COLUMNS
  },
  t => ({
    accountsEmailUniqueIndex: uniqueIndex('accounts_email_unique_index').using(
      'btree',
      sql`lower(${t.email})`
    )
  })
)

export const accountsRelations = relations(accounts, ({ one, many }) => ({
  names: many(accountNames),
  student: one(students),
  professor: one(professors),
  transactions: many(transactions),
  forums: many(forums),
  posts: many(posts),
  postReactions: many(postReactions),
  replies: many(replies),
  replyReactions: many(replyReactions),
  reactions: many(reactions)
}))
