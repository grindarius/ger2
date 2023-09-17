import chalk from 'chalk'
import { writeFile } from 'node:fs/promises'

export const toJson = async (value, filename) => {
  console.log(chalk.yellow(`- Saving ./src/json/${filename}.json`))
  await writeFile(`./src/json/${filename}.json`, JSON.stringify(value, null, 2), 'utf-8')
  console.log(chalk.greenBright(`- Successfully saved ./src/json/${filename}.json`))
}