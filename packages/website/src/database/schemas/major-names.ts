import { relations } from 'drizzle-orm'
import { pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from './helpers'
import { majors } from './majors'

export const majorNames = pgTable('major_names', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  name: text('name').notNull().unique(),
  courseName: text('course_name').notNull(),
  ...TIMESTAMP_COLUMNS
})

export const majorNamesRelations = relations(majorNames, ({ many }) => ({
  majors: many(majors)
}))
