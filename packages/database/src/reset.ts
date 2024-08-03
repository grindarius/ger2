import consola from 'consola'
import { client as sql } from './database.js'

consola.info('Removing tables from public schema')
const tablenames = await sql<
  {
    tablename: string
  }[]
>`select tablename from pg_tables where schemaname = 'public'`

for (const tablename of tablenames) {
  consola.info('-', tablename.tablename)
  // could have been that stuff around $1 template literal is wrapped in single quote, not double qoute.
  // That's why we cannot use $1 template literal normally. Because table name needs to be double-quoted.
  await sql`drop table if exists ${sql(tablename)} cascade`
}

consola.info('Successfully removed all tables in public schema\n')
consola.info('Removing user defined types')

for (const typname of ['role', 'day_of_week', 'transaction_status', 'room_type']) {
  consola.info(consola.info('-', typname))
  await sql`delete from pg_type where typname = ${typname}`
}

consola.info('Removing migrations history')

await sql`drop schema if exists "drizzle" cascade`

consola.info('Done!')
process.exit()
