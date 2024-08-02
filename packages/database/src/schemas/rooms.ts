import { relations } from 'drizzle-orm'
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { buildings } from './buildings.js'
import { openingSubjectSchedules } from './opening-subjects-schedules.js'

export const rooms = pgTable('rooms', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  buildingId: varchar('building_id', { length: 26 }).notNull(),
  name: varchar('name', { length: 512 }).notNull(),
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
