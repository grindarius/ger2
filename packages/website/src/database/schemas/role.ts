import { pgEnum } from 'drizzle-orm/pg-core'

export const ROLE = ['admin', 'professor', 'student'] as const
export const role = pgEnum('role', ROLE)
