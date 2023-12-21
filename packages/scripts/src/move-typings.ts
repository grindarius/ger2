import { cp } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const source = resolve(__dirname, '..', '..', 'api', 'bindings')
const destination = resolve(__dirname, '..', '..', 'website', 'src', 'types', 'server')

console.log('Copying files from', source, 'to', destination)
await cp(source, destination, { recursive: true })
console.log('Done')
