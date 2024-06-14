import { sql } from 'drizzle-orm'
import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const forums = pgTable('forums', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  userId: varchar('user_id', { length: 26 }).notNull(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  slug: varchar('slug', { length: 300 }).notNull().unique(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => sql`now()`)
})
