import { pgTable, varchar } from "drizzle-orm/pg-core";

export const forumPostComments = pgTable('forum_post_comments', {
  id: varchar('id', { length: 32 }).notNull().primaryKey(),
  forumPostId
})
