import { relations } from 'drizzle-orm'
import { pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from './helpers'
import { semesterDates } from './semester-dates'

export const semesterDateNames = pgTable('semester_date_names', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  name: text('name').notNull().unique(),
  ...TIMESTAMP_COLUMNS
})

export const semesterDateNamesRelations = relations(semesterDateNames, ({ many }) => ({
  semesters: many(semesterDates)
}))
