import dotenv from 'dotenv-flow'
import { Kysely, PostgresDialect } from 'kysely'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import pg from 'pg'

import { type Database } from '../types/index.js'

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = dirname(fileURLToPath(import.meta.url))

dotenv.config({
  path: resolve(__dirname, '..', '..')
})

const dialect = new PostgresDialect({
  pool: new pg.Pool({
    database: process.env.PG_DBNAME,
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    port: Number(process.env.PG_PORT),
    max: 5
  })
})

export const k = new Kysely<Database>({ dialect })
