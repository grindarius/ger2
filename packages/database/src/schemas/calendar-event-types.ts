import { relations } from 'drizzle-orm'
import { pgTable, uniqueIndex, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { calendarEvents } from './calendar-events.js'

/**
 * Stores information about an event type. Which will be attached
 * to a `calendar_events` table where you will have the name, slug,
 * the dates and timezone as well.
 *
 * Some id or slug of event types will be recorded to be queried for 
 * time sensitive events like enrollments or late enroll.
 */
export const calendarEventTypes = pgTable(
  'calendar_event_types',
  {
    id: varchar('id', { length: 26 }).notNull().primaryKey(),
    name: varchar('name', { length: 512 }).notNull(),

    /**
     * Slug matching regexp `[A-Za-z0-9-]{2,30}`.
     *
     * forced to be hyphenated.
     */
    slug: varchar('slug', { length: 30 }).notNull(),
    ...TIMESTAMP_COLUMNS
  },
  t => ({
    calendarEventTypesNameSlugUniqueIndex: uniqueIndex(
      'calendar_event_types_\
      name_\
      slug_\
      unique_index'
    ).on(t.name, t.slug)
  })
)

export const calendarEventTypesRelations = relations(calendarEventTypes, ({ many }) => ({
  calendarEvents: many(calendarEvents)
}))
