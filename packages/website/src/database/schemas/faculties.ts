import { relations } from 'drizzle-orm'
import { pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { majors } from './majors'
import { TIMESTAMP_COLUMNS } from './helpers'

export const faculties = pgTable('faculties', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  name: text('name').notNull(),
  ...TIMESTAMP_COLUMNS
})

export const facultiesRelations = relations(faculties, ({ many }) => ({
  majors: many(majors)
}))
