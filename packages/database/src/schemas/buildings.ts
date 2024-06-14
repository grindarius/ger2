import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS, point } from '../utils.js'
import { rooms } from './rooms.js'

export const buildings = pgTable('buildings', {
  id: varchar('id', { length: 32 }).notNull().primaryKey(),
  name: text('name').notNull(),
  coordinates: point('coordinates').notNull(),
  buildingCreatedAt: timestamp('building_created_at', {
    withTimezone: true,
    mode: 'string'
  }).notNull(),
  ...TIMESTAMP_COLUMNS
})

export const buildingsRelations = relations(buildings, ({ many }) => ({
  rooms: many(rooms)
}))
