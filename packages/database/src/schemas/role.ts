import { pgEnum } from "drizzle-orm/pg-core";

export const ROLE = [
  'professor',
  'admin',
  'student'
] as const

/**
 * Determine user roles inside a website.
 */
export const role = pgEnum('role', ROLE)
