import { relations } from 'drizzle-orm'
import { pgTable, uniqueIndex, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { calendarEvents } from './calendar-events.js'

/**
 * Stores information about an event type. Which will be attached
 * to a `calendar_events` table where you will have the name, slug,
 * the dates and timezone as well.
 */
export const calendarEventTypes = pgTable(
  'calendar_event_types',
  {
    id: varchar('id', { length: 26 }).notNull().primaryKey(),
    name: varchar('name', { length: 512 }).notNull(),
    slug: varchar('slug', { length: 1024 }).notNull(),
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
