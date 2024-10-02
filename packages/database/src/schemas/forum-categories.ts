import { pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { accounts } from './accounts.js'
import { bytea } from '../types/bytea.js'
import { InferInsertModel, InferSelectModel } from 'drizzle-orm'

export const forumCategories = pgTable('forum_categories', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull().default(''),
  createdById: varchar('created_by_id', { length: 26 })
    .notNull()
    .references(() => accounts.id),
  color: bytea('color'),
  ...TIMESTAMP_COLUMNS
})

type XD = InferSelectModel<typeof forumCategories>