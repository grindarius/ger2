import { pgTable, primaryKey, timestamp, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { semesterDateNames } from './semester-date-names.js'
import { semesters } from './semesters.js'
import { relations } from 'drizzle-orm'

export const semesterDates = pgTable(
  'semester_dates',
  {
    semesterDateNameId: varchar('semester_date_name_id', { length: 32 })
      .notNull()
      .references(() => semesterDateNames.id),
    semesterId: varchar('semester_id', { length: 32 })
      .notNull()
      .references(() => semesters.id),
    start: timestamp('start', { withTimezone: true, mode: 'string' }).notNull(),
    end: timestamp('end', { withTimezone: true, mode: 'string' }).notNull(),
    ...TIMESTAMP_COLUMNS
  },
  t => ({
    pk: primaryKey({ columns: [t.semesterDateNameId, t.semesterId] })
  })
)

export const semesterDatesRelations = relations(semesterDates, ({ one }) => ({
  semesterDateName: one(semesterDateNames, {
    fields: [semesterDates.semesterDateNameId],
    references: [semesterDateNames.id]
  }),
  semester: one(semesters, {
    fields: [semesterDates.semesterId],
    references: [semesters.id]
  })
}))
