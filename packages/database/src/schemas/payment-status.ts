import { pgEnum } from "drizzle-orm/pg-core";

export const PAYMENT_STATUS = ['pending', 'completed', 'cancelled'] as const

export const paymentStatus = pgEnum('payment_status', PAYMENT_STATUS)
