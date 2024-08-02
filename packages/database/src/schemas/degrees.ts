import { relations } from 'drizzle-orm'
import { pgTable, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { majors } from './majors.js'

/**
 * Stores list of degrees a major will give you when you graduate.
 * e.g. `Doctor of Philosophy, Chemistry major.`, `Bachelor of Chemistry`.
 */
export const degrees = pgTable('degrees', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  name: varchar('name', { length: 512 }).notNull().unique(),
  ...TIMESTAMP_COLUMNS
})

export const degreesRelations = relations(degrees, ({ many }) => ({
  majors: many(majors)
}))
