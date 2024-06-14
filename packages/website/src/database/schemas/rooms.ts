import { relations, sql } from 'drizzle-orm'
import { integer, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { buildings } from './buildings'
import { openingSubjectSchedules } from './opening-subject-schedules'
import { roomType } from './room-type'

export const rooms = pgTable('rooms', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  buildingId: varchar('building_id', { length: 26 }).notNull(),
  name: text('name').notNull(),
  roomType: roomType('room_type').notNull(),
  capacity: integer('capacity').notNull(),
  floor: integer('floor').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => sql`now()`)
})

export const roomsRelations = relations(rooms, ({ one, many }) => ({
  building: one(buildings, {
    fields: [rooms.buildingId],
    references: [buildings.id]
  }),
  schedules: many(openingSubjectSchedules)
}))
