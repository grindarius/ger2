import chalk from 'chalk'
import { sql } from 'kysely'
import { k } from './postgres/index.js'

console.log(chalk.yellow('Removing tables from public schema'))
const tablenames = await sql<{
  tablename: string
}>`select tablename from pg_tables where schemaname = ${sql.lit('public')}`.execute(k)

for (const tablename of tablenames.rows) {
  console.log(chalk.blueBright('-', tablename.tablename))
  // could have been that stuff around $1 template literal is wrapped in single quote, not double qoute.
  // That's why we cannot use $1 template literal normally. Because table name needs to be double-quoted.
  await sql`drop table if exists ${sql.table(tablename.tablename)} cascade`.execute(k)
}

console.log(chalk.greenBright('Successfully removed all tables in public schema\n'))
console.log(chalk.yellow('Removing user defined types'))

for (const typname of ['role', 'day_of_week', 'semester_exam_type', 'payment_status', 'room_type']) {
  await sql`delete from pg_type where typname = ${sql.lit(typname)}`.execute(k)
  console.log(chalk.blueBright('-', typname))
}

console.log(chalk.greenBright('Done!'))

process.exit()
