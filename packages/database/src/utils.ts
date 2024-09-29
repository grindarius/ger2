import { ColumnBaseConfig, entityKind, sql } from 'drizzle-orm'
import { customType, PgColumn, PgColumnBuilder, timestamp } from 'drizzle-orm/pg-core'

export const TIMESTAMP_COLUMNS = {
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => sql`now()`)
} as const

export const DELETED_AT_COLUMN = {
  deletedAt: timestamp('deleted_at', { withTimezone: true, mode: 'string' }).default('null')
}

export const bytea = customType<{ data: Buffer; notNull: false; default: false }>({
  dataType() {
    return 'bytea'
  },
  toDriver(val) {
    return val.toString('hex')
  },
  fromDriver(val) {
    return Buffer.from(val as string)
  }
})

export class PgBytea<T extends ColumnBaseConfig<'buffer', 'PgBytea'>> extends PgColumn<T> {
  static readonly [entityKind]: string = 'PgBytea'

  
}
