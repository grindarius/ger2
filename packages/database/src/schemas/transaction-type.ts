import { pgEnum } from 'drizzle-orm/pg-core'

export const TRANSACTION_TYPE = ['enroll-subject', 'move-subject'] as const

export const transactionType = pgEnum('transaction_type', TRANSACTION_TYPE)
