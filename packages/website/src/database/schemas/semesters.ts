import { relations } from 'drizzle-orm'
import { pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'
import { academicYears } from './academic-years'
import { TIMESTAMP_COLUMNS } from './helpers'
import { semesterDates } from './semester-dates'

export const semesters = pgTable('semesters', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  academicYearId: varchar('academic_year_id', { length: 26 }).notNull(),
  start: timestamp('start', { withTimezone: true, mode: 'string' }).notNull(),
  end: timestamp('end', { withTimezone: true, mode: 'string' }).notNull(),
  ...TIMESTAMP_COLUMNS
})

export const semestersRelations = relations(semesters, ({ one, many }) => ({
  academicYear: one(academicYears, {
    fields: [semesters.academicYearId],
    references: [academicYears.id]
  }),
  semesterDates: many(semesterDates)
}))
