import { pgEnum } from 'drizzle-orm/pg-core'

export const TRANSACTION_STATUS = ['pending', 'completed', 'failed'] as const

export const transactionStatus = pgEnum('transaction_status', TRANSACTION_STATUS)
