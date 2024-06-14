import { pgEnum } from 'drizzle-orm/pg-core'

export const ROOM_TYPE = [
  'lab',
  'lecture',
  'conference',
  'restroom',
  'co-working-spaces',
  'work',
  'other'
] as const

export const roomType = pgEnum('room_type', ROOM_TYPE)
