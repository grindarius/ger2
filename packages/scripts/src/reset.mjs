import chalk from 'chalk'

import { k } from './postgres/index.mjs'

console.log(chalk.yellow('Removing tables from public schema'))
const tablenames = await k.raw('select tablename from pg_tables where schemaname = ?', ['public'])

for (const tablename of tablenames.rows) {
  console.log(chalk.blueBright('-', tablename.tablename))
  // could have been that stuff around $1 template literal is wrapped in single quote, not double qoute.
  // That's why we cannot use $1 template literal normally. Because table name needs to be double-quoted.
  await k.raw(`drop table if exists ${tablename.tablename} cascade`)
}

console.log(chalk.greenBright('Successfully removed all tables in public schema\n'))
console.log(chalk.yellow('Removing user defined types'))

for (const typname of ['user_role', 'day_of_week', 'semester_type']) {
  await k.raw('delete from pg_type where typname = ?', [typname])
  console.log(chalk.blueBright('-', typname))
}

console.log(chalk.greenBright('Done!'))

process.exit()
