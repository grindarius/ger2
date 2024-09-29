import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { accounts } from './accounts.js'
import { forumCategories } from './forum-categories.js'

export const forumPosts = pgTable('forum_posts', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  name: varchar('name', { length: 26 }).notNull(),
  accountId: varchar('account_id', { length: 26 })
    .notNull()
    .references(() => accounts.id),
  forumCategoryId: varchar('forum_category_id', { length: 26 })
    .notNull()
    .references(() => forumCategories.id),
  content: text('content').notNull().default(''),
  lastActiveAt: timestamp('last_active_at', { mode: 'string' }).notNull().defaultNow(),
  ...TIMESTAMP_COLUMNS
})
