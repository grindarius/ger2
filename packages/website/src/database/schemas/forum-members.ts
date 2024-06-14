import { index, pgTable, varchar } from 'drizzle-orm/pg-core'

export const forumMembers = pgTable(
  'forum_members',
  {
    forumId: varchar('forum_id', { length: 26 }).notNull(),
    userId: varchar('user_id', { length: 26 }).notNull(),
    roleId: varchar('role_id', { length: 26 }).notNull()
  },
  t => ({
    pk: index().on(t.forumId, t.userId)
  })
)
