import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dialect: 'postgresql',
  out: './src/migrations',
  schema: './src/schemas/*',
  dbCredentials: {
    database: process.env.PG_DBNAME ?? 'ger2',
    host: process.env.PG_HOST ?? '127.0.0.1',
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    port: Number(process.env.PG_PORT)
  }
})
