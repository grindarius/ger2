import { relations } from 'drizzle-orm'
import { integer, pgTable, text, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { buildings } from './buildings.js'
import { openingSubjectSchedules } from './opening-subject-schedules.js'
import { roomType } from './room-type.js'

export const rooms = pgTable('rooms', {
  id: varchar('id', { length: 32 }).notNull().primaryKey(),
  buildingId: varchar('building_id', { length: 32 }).notNull(),
  name: text('name').notNull(),
  roomType: roomType('room_type'),
  capacity: integer('capacity').notNull(),
  floor: integer('floor').notNull().default(1),
  ...TIMESTAMP_COLUMNS
})

export const roomsRelations = relations(rooms, ({ one, many }) => ({
  building: one(buildings, {
    fields: [rooms.buildingId],
    references: [buildings.id]
  }),
  openingSubjectSchedules: many(openingSubjectSchedules)
}))
