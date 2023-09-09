import dotenv from 'dotenv-flow'
import knex from 'knex'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = dirname(fileURLToPath(import.meta.url))

dotenv.config({
  path: resolve(__dirname, '..', '..')
})

export const k = knex({
  client: 'pg',
  connection: {
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT == null ? 7321 : Number(process.env.PG_PORT),
    database: process.env.PG_DBNAME
  }
})
