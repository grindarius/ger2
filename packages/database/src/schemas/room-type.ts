import { pgEnum } from 'drizzle-orm/pg-core'

export const ROOM_TYPE = ['study', 'lab', 'conferences', 'others'] as const

/**
 * Stores types of rooms a building can have.
 */
export const roomType = pgEnum('room_type', ROOM_TYPE)
