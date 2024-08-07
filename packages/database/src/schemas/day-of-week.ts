import { pgEnum } from 'drizzle-orm/pg-core'

export const DAY_OF_WEEK = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday'
] as const

/**
 * Enum stores possible day in a week.
 */
export const dayOfWeek = pgEnum('day_of_week', DAY_OF_WEEK)
