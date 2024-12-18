import { relations } from 'drizzle-orm'
import { index, pgTable, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { majors } from './majors.js'

/**
 * Stores information about a faculty inside a university.
 * e.g. `Faculty of Science` or `Faculty of Social Science`.
 */
export const faculties = pgTable(
  'faculties',
  {
    id: varchar('id', { length: 26 }).notNull().primaryKey(),
    name: varchar('name', { length: 256 }).notNull().unique(),
    ...TIMESTAMP_COLUMNS
  },
  t => [index('pgroonga_faculties_index').using('pgroonga', t.name)]
)

export const facultiesRelations = relations(faculties, ({ many }) => ({
  majors: many(majors)
}))
