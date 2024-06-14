import { relations } from 'drizzle-orm'
import { pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { majors } from './majors.js'

export const faculties = pgTable('faculties', {
  id: varchar('id', { length: 32 }).notNull().primaryKey(),
  name: text('name').notNull(),
  ...TIMESTAMP_COLUMNS
})

export const facultiesRelations = relations(faculties, ({ many }) => ({
  majors: many(majors)
}))
