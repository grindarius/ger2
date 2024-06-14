import { relations } from 'drizzle-orm'
import { pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from './helpers'
import { majors } from './majors'

export const curriculums = pgTable('curriculums', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  name: text('name').notNull(),
  ...TIMESTAMP_COLUMNS
})

export const curriculumsRelations = relations(curriculums, ({ many }) => ({
  majors: many(majors)
}))
