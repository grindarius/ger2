import { relations } from 'drizzle-orm'
import { pgTable, time, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { dayOfWeek } from './day-of-week.js'
import { openingSubjects } from './opening-subjects.js'
import { rooms } from './rooms.js'

/**
 * Stores information about the repeating schedule of the subjects.
 */
export const openingSubjectSchedules = pgTable('opening_subject_schedules', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  openingSubjectId: varchar('opening_subject_id', { length: 26 }).notNull(),
  roomId: varchar('room_id', { length: 26 }).notNull(),
  day: dayOfWeek('day').notNull(),
  start: time('start').notNull(),
  end: time('end').notNull(),
  timezone: varchar('timezone', { length: 128 }).notNull(),
  ...TIMESTAMP_COLUMNS
})

export const openingSubjectSchedulesRelations = relations(openingSubjectSchedules, ({ one }) => ({
  openingSubject: one(openingSubjects, {
    fields: [openingSubjectSchedules.openingSubjectId],
    references: [openingSubjects.id]
  }),
  room: one(rooms, {
    fields: [openingSubjectSchedules.roomId],
    references: [rooms.id]
  })
}))
