import { relations } from 'drizzle-orm'
import { integer, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { academicYears } from './academic-years.js'
import { calendarEvents } from './calendar-events.js'
import { majorStudyPlans } from './major-study-plans.js'
import { openingSubjects } from './opening-subjects.js'

/**
 * Stores information about each semester.
 *
 * In one academic year, there can be upwards of 2 to 3 semesters.
 * The semester will have a set of dates taken from `calendar_events` table,
 * where it will stores information of a date inside.
 */
export const semesters = pgTable('semesters', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  academicYearId: varchar('academic_year_id', { length: 26 }).notNull(),
  start: timestamp('start', { withTimezone: true, mode: 'string' }).notNull(),
  end: timestamp('end', { withTimezone: true, mode: 'string' }).notNull(),

  /**
   * Keeps the index of the first/second/third semester in the academic year.
   */
  semesterIndex: integer('semester_index').notNull().default(1),
  ...TIMESTAMP_COLUMNS
})

export const semestersRelations = relations(semesters, ({ one, many }) => ({
  academicYear: one(academicYears, {
    fields: [semesters.academicYearId],
    references: [academicYears.id]
  }),
  calendarEvents: many(calendarEvents),
  openingSubjects: many(openingSubjects),
  majorStudyPlans: many(majorStudyPlans)
}))
