import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { relations } from 'drizzle-orm'

export const majorNames = pgTable('major_names', {
  id: varchar('id', { length: 32 }).notNull().primaryKey(),
  name: varchar('name', { length: 32 }).notNull(),
  courseName: varchar('course_name', { length: 32 }).notNull(),
  ...TIMESTAMP_COLUMNS
})

export const majorNamesRelations = relations(majorNames, ({ many }) => ({
  majors: many(majors)
}))
