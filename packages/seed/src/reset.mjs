import chalk from 'chalk'

import { pool } from './postgres.mjs'

console.log(chalk.blueBright('Removing tables from public schema'))
const tablenames = await pool.query('select tablename from pg_tables where schemaname = $1', ['public'])

for (const tablename of tablenames.rows) {
  console.log(chalk.blueBright('-', tablename.tablename))
  // could have been that stuff around $1 template literal is wrapped in single quote, not double qoute.
  // That's why we cannot use $1 template literal normally. Because table name needs to be double-quoted.
  await pool.query(`drop table if exists ${tablename.tablename} cascade`)
}

console.log(chalk.blueBright('Successfully removed all tables in public schema'))
console.log(chalk.blueBright('Removing user defined types'))

for (const typname of ['user_role', 'day_of_week']) {
  await pool.query('delete from pg_type where typname = $1', typname)
  console.log(chalk.blueBright('-', typname))
}

console.log(chalk.greenBright('Done!'))
