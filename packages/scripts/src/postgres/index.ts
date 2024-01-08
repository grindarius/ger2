import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import dotenv from 'dotenv-flow'
import { Kysely } from 'kysely'
import { PostgresJSDialect } from 'kysely-postgres-js'
import postgres from 'postgres'
import { type Database } from '../types/index.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

dotenv.config({
  path: resolve(__dirname, '..', '..')
})

const sql = postgres({
  database: process.env.PG_DBNAME,
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  port: Number(process.env.PG_PORT)
})

const dialect = new PostgresJSDialect({
  postgres: sql
})

export const k = new Kysely<Database>({ dialect })
