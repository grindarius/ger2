import { relations } from 'drizzle-orm'
import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { semesterDates } from './semester-dates.js'

export const semesterDateNames = pgTable('semester_date_names', {
  id: varchar('id', { length: 32 }).notNull().primaryKey(),
  name: varchar('name', { length: 255 }).notNull().unique(),
  ...TIMESTAMP_COLUMNS
})

export const semesterDateNamesRelations = relations(semesterDateNames, ({ many }) => ({
  semesterDates: many(semesterDates)
}))
