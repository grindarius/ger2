import { relations } from 'drizzle-orm'
import { pgTable, primaryKey, timestamp, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { calendarEventTypes } from './calendar-event-types.js'
import { semesters } from './semesters.js'

/**
 * Stores calendar information for an event. Linked to `calendar_event_types` table
 * which provides the name and type of the event.
 */
export const calendarEvents = pgTable(
  'calendar_events',
  {
    calendarEventTypeId: varchar('calendar_event_type_id', { length: 26 })
      .notNull()
      .references(() => calendarEventTypes.id),
    semesterId: varchar('semester_id', { length: 26 })
      .notNull()
      .references(() => semesters.id),
    start: timestamp('start', { withTimezone: true, mode: 'string' }).notNull(),
    end: timestamp('end', { withTimezone: true, mode: 'string' }).notNull(),
    timezone: varchar('timezone', { length: 128 }).notNull(),
    ...TIMESTAMP_COLUMNS
  },
  t => [primaryKey({ columns: [t.calendarEventTypeId, t.semesterId] })]
)

export const calendarEventsRelations = relations(calendarEvents, ({ one }) => ({
  calendarEventType: one(calendarEventTypes, {
    fields: [calendarEvents.calendarEventTypeId],
    references: [calendarEventTypes.id]
  }),
  semester: one(semesters, {
    fields: [calendarEvents.semesterId],
    references: [semesters.id]
  })
}))
