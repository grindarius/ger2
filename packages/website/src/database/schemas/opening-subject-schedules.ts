import { relations, sql } from 'drizzle-orm'
import { pgTable, time, timestamp, varchar } from 'drizzle-orm/pg-core'
import { dayOfWeek } from './day-of-week'
import { openingSubjects } from './opening-subjects'
import { rooms } from './rooms'

export const openingSubjectSchedules = pgTable('opening_subject_schedules', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  openingSubjectId: varchar('opening_subject_id', { length: 26 }).notNull(),
  roomId: varchar('room_id', { length: 26 }).notNull(),
  day: dayOfWeek('day').notNull(),
  start: time('start').notNull(),
  end: time('end').notNull(),
  timezone: varchar('timezone', { length: 128 }),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => sql`now()`)
})

export const openingSubjectSchedulesRelations = relations(
  openingSubjectSchedules,
  ({ one }) => ({
    openingSubject: one(openingSubjects, {
      fields: [openingSubjectSchedules.openingSubjectId],
      references: [openingSubjects.id]
    }),
    room: one(rooms, {
      fields: [openingSubjectSchedules.roomId],
      references: [rooms.id]
    })
  })
)
