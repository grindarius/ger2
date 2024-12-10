import { relations } from 'drizzle-orm'
import { index, integer, pgTable, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { buildings } from './buildings.js'
import { openingSubjectSchedules } from './opening-subject-schedules.js'
import { roomType } from './room-type.js'

/**
 * Stores room information for subjects to reference from
 * about where the student will go to for studying.
 */
export const rooms = pgTable(
  'rooms',
  {
    id: varchar('id', { length: 26 }).notNull().primaryKey(),
    buildingId: varchar('building_id', { length: 26 })
      .notNull()
      .references(() => buildings.id),
    name: varchar('name', { length: 512 }).notNull(),
    type: roomType('room_type').notNull(),

    /**
     * Denotes the amount of students a room can fit.
     */
    capacity: integer('capacity').notNull(),

    /**
     * Denotes where the room is at which floor.
     * Can be negative or zero for underground rooms.
     */
    floor: integer('floor').notNull().default(1),
    ...TIMESTAMP_COLUMNS
  },
  t => [index('pgroonga_rooms_index').using('pgroonga', t.name, t.type)]
)

export const roomsRelations = relations(rooms, ({ one, many }) => ({
  building: one(buildings, {
    fields: [rooms.buildingId],
    references: [buildings.id]
  }),
  openingSubjectSchedules: many(openingSubjectSchedules)
}))
