import { relations, sql } from 'drizzle-orm'
import { pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { point } from '../types/point'
import { rooms } from './rooms'

export const buildings = pgTable('buildings', {
  id: varchar('id', { length: 26 }).notNull().primaryKey(),
  name: text('name').notNull(),
  coordinates: point('coordinates').notNull(),
  buildingCreatedAt: timestamp('building_created_at', {
    withTimezone: true,
    mode: 'string'
  }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => sql`now()`)
})

export const buildingsRelations = relations(buildings, ({ many }) => ({
  rooms: many(rooms)
}))
