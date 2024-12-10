import { pgEnum } from 'drizzle-orm/pg-core'

export const ACCOUNT_TYPE = ['professor', 'admin', 'student'] as const

/**
 * Stores user's account type inside a website.
 */
export const accountType = pgEnum('account_type', ACCOUNT_TYPE)
