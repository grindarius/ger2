import postgres from 'postgres'

export const client = postgres({
  database: process.env.PG_DBNAME,
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASS,
  port: Number(process.env.PG_PORT),
  max: 15,
  onnotice: () => {}
})
