import { relations } from 'drizzle-orm'
import { pgTable, primaryKey, varchar } from 'drizzle-orm/pg-core'
import { forumRoles } from './forum-roles.js'
import { forums } from './forums.js'
import { users } from './users.js'

export const forumMembers = pgTable(
  'forum_members',
  {
    forumId: varchar('forum_id', { length: 32 })
      .notNull()
      .references(() => forums.id),
    userId: varchar('user_id', { length: 32 })
      .notNull()
      .references(() => users.id),
    roleId: varchar('role_id', { length: 32 })
      .notNull()
      .references(() => forumRoles.id)
  },
  t => ({
    pk: primaryKey({ columns: [t.forumId, t.userId, t.roleId] })
  })
)

export const forumMembersRelations = relations(forumMembers, ({ one }) => ({
  forum: one(forums, {
    fields: [forumMembers.forumId],
    references: [forums.id]
  }),
  user: one(users, {
    fields: [forumMembers.userId],
    references: [users.id]
  }),
  role: one(forumRoles, {
    fields: [forumMembers.roleId],
    references: [forumRoles.id]
  })
}))
