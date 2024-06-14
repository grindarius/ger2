import { relations } from 'drizzle-orm'
import { pgTable, primaryKey, time, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { dayOfWeek } from './day-of-week.js'
import { openingSubjects } from './opening-subjects.js'
import { rooms } from './rooms.js'

export const openingSubjectSchedules = pgTable(
  'opening_subject_schedules',
  {
    openingSubjectId: varchar('opening_subject_id', { length: 32 })
      .notNull()
      .references(() => openingSubjects.id),
    roomId: varchar('room_id', { length: 32 })
      .notNull()
      .references(() => rooms.id),
    day: dayOfWeek('day').notNull(),
    start: time('start').notNull(),
    end: time('end').notNull(),
    timezone: varchar('timezone', { length: 64 }).notNull(),
    ...TIMESTAMP_COLUMNS
  },
  t => ({ pk: primaryKey({ columns: [t.openingSubjectId, t.roomId] }) })
)

export const openingSubjectsSchedulesRelations = relations(openingSubjectSchedules, ({ one }) => ({
  openingSubject: one(openingSubjects, {
    fields: [openingSubjectSchedules.openingSubjectId],
    references: [openingSubjects.id]
  }),
  room: one(rooms, {
    fields: [openingSubjectSchedules.roomId],
    references: [rooms.id]
  })
}))
