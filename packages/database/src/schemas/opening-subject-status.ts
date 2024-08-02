import { pgEnum } from 'drizzle-orm/pg-core'

export const OPENING_SUBJECT_STATUS = ['open', 'open-only-disenroll', 'closed'] as const

/**
 * Stores possible status of an opening subject.
 */
export const openingSubjectStatus = pgEnum('opening_subject_status', OPENING_SUBJECT_STATUS)
