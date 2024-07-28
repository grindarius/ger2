import { relations } from 'drizzle-orm'
import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { majors } from './majors.js'

/**
 * Stores information about a faculty inside a university.
 * e.g. `Faculty of Science` or `Faculty of Social Science`.
 */
export const faculties = pgTable('faculties', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  name: varchar('name', { length: 256 }).notNull().unique(),
  ...TIMESTAMP_COLUMNS
})

export const facultiesRelations = relations(faculties, ({ many }) => ({
  majors: many(majors)
}))
