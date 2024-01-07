import { databaseUser, testAdapter } from '@lucia-auth/adapter-test'
import postgres from 'postgres'
import { createClient } from 'redis'
import { Config, PostgresRedisSessionAdapter } from '../src/index.js'

const sql = postgres('http://postgres:postgres@localhost:8475/ger2_lucia')

// biome-ignore lint/suspicious/noExplicitAny: fuck redis type system
const redis = createClient<any, any, any>({
  url: 'redis://localhost:6958',
})

redis.on('error', err => {
  console.error('Redis client error', err)
})

const account = {
  id: databaseUser.id,
  username: databaseUser.attributes.username,
}

await sql`drop table if exists public.accounts`

await sql`create table if not exists accounts (
  id varchar(32) not null unique,
  username varchar(32) not null unique,
  primary key (id)
)`

await sql`insert into accounts ${sql(account)}`

const config: Config = {
  tableNames: {
    user: 'accounts',
  },
  redis: {
    sessionPrefix: 'session',
    userSessionsPrefix: 'account_sessions',
  },
}

await redis.connect()
const adapter = new PostgresRedisSessionAdapter(sql, redis, config)

await testAdapter(adapter)

await sql`drop table accounts`
await redis.disconnect()
