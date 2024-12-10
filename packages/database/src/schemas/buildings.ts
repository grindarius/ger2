import { relations } from 'drizzle-orm'
import { index, integer, pgTable, point, timestamp, varchar } from 'drizzle-orm/pg-core'
import { TIMESTAMP_COLUMNS } from '../utils.js'
import { rooms } from './rooms.js'

/**
 * Stores information about buildings inside a university.
 */
export const buildings = pgTable(
  'buildings',
  {
    id: varchar('id', { length: 26 }).notNull().primaryKey(),
    name: varchar('name', { length: 512 }).notNull().unique(),
    coordinates: point('coordinates', { mode: 'xy' }).notNull(),
    floors: integer('floors').notNull(),
    buildingCreatedAt: timestamp('building_created_at', {
      withTimezone: true,
      mode: 'string'
    }).notNull(),
    ...TIMESTAMP_COLUMNS
  },
  t => [index('pgroonga_buildings_index').using('pgroonga', t.name)]
)

export const buildingsRelations = relations(buildings, ({ many }) => ({
  rooms: many(rooms)
}))
