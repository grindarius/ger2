import dotenv from 'dotenv-flow'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import pg from 'pg'

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = dirname(fileURLToPath(import.meta.url))

dotenv.config({
  path: resolve(__dirname, '..')
})

export const pool = new pg.Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT == null ? 8634 : Number(process.env.PG_PORT),
  database: process.env.PG_DBNAME
})
